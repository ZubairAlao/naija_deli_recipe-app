"use client"

import ListCard from "@/app/ui/list-card"
import { useRouter } from "next/navigation";
import { ListCardSkeleton } from "@/app/ui/skeletons";
import { useState, useEffect } from "react";
import SideNav from '@/app/ui/categories/sideNav';
import { useSession } from "next-auth/react";


interface Post {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  imagePublicId: string;
  ingredients: string;
  likes: number;
  likedBy: string[];
  time: number;
  walkthrough: string;
  categories: string;
  __v: number;
  createdAt: string;
  creator: {
    _id: string;
    email: string;
    username: string;
    image: string;
    __v: number;
    createdAt: string;
  };
}

interface ListCardPostsProps {
  data: Post[];
  loading: boolean;
  likeLoading: Record<string, boolean>;
  handleEdit: (post: Post) => void;
  handleDelete: (post: Post) => void;
  handleLike: (post: Post) => void;
}

const ListCardPosts: React.FC<ListCardPostsProps> = ({ data, loading, handleEdit, handleDelete, handleLike, likeLoading }) => {
  if (loading) {
    return (
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <ListCardSkeleton />
        <ListCardSkeleton />
        <ListCardSkeleton />
      </div>
    );
  }
  if (!data || data.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {data.map((post) => (
        <ListCard
          key={post._id}
          post={post}
          handleEdit={() => handleEdit(post)}
          handleDelete={() => handleDelete(post)}
          handleLike={() => handleLike(post)}
          likeLoading={likeLoading[post._id]}
        />
      ))}
    </div>
  );
};

export default function Page() {
  const [categoryPosts, setCategoryPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoryResults, setCategoryResults] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const router = useRouter();
  const { data: session } = useSession();
  const [likeLoading, setLikeLoading] = useState<Record<string, boolean>>({});

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/post');

      if (!response.ok) {
        // throw new Error(`Error: ${response.status} ${response.statusText}`);
        throw new Error(`Error: Refresh the browser to continue`);
      }

      const data = await response.json();
      const sortedData = data.sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setCategoryPosts(sortedData);
      setError(null); // Clear any previous errors
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false); 
    }
  };

  const handleEdit = (post: Post) => {
    router.push(`/edit-recipe?id=${post._id}`);
  };

  const handleDelete = async (post: Post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        // Perform both deletions concurrently
        await Promise.all([
          fetch('/api/deleteImage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ public_id: post.imagePublicId })
          }),
          fetch(`/api/post/${post._id}`, {
            method: 'DELETE'
          })
        ]);

        const filteredPosts = categoryPosts.filter((p) => p._id !== post._id);
        setCategoryPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filterPosts = (category: string) => {
    const regex = new RegExp(category, "i"); // 'i' flag for case-insensitive search
    return categoryPosts.filter(
      (item) => regex.test(item.categories)
    );
  };

  const handleCategoryClick = (categoryName: string) => {
    const searchResult = filterPosts(categoryName);
    setCategoryResults(searchResult);
    setSelectedCategory(categoryName);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (post: Post) => {
    if (!session) {
      alert('You must be logged in to like a post.');
      return;
    }
    setLikeLoading(prev => ({ ...prev, [post._id]: true }));
    try {
      const res = await fetch(`/api/likes/${post._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: session?.user?.id }), // Send userId in request body
      });

      const data = await res.json();

      if (res.ok) {
        // Update categoryPosts
        const updatedCategoryPosts = categoryPosts.map(p =>
          p._id === post._id ? { ...p, likes: data.likes } : p
        );
        setCategoryPosts(updatedCategoryPosts);

        // Update categoryResults if it's being displayed
        if (categoryResults.length > 0) {
          const updatedCategoryResults = categoryResults.map(p =>
            p._id === post._id ? { ...p, likes: data.likes } : p
          );
          setCategoryResults(updatedCategoryResults);
        }
      }
    } catch (error) {
      console.error('Error liking the post:', error);
    } finally {
      setLikeLoading(prev => ({ ...prev, [post._id]: false }));
    }
  };

  const postsToDisplay = categoryResults.length > 0 ? categoryResults : categoryPosts;

  return (
    <section className="flex py-12">
      <div>
        <SideNav data={categoryPosts} categoryClick={handleCategoryClick}/>
      </div>

      <div className="md:ml-48 p-8 w-full mt-20 md:mt-0">
      <div className="flex gap-2 items-center">
        <p className={`text-${selectedCategory ? '#008000' : '#ffa500'} font-semibold`}>
          {selectedCategory ? `Category: ${selectedCategory}` : "All categories"}
        </p>
        {categoryResults.length > 0 ? 
          <div 
            className="cursor-pointer text-red-500 bg-red-100 hover:bg-red-200 px-2 py-1 rounded transition duration-200"
            onClick={() => { setCategoryResults([]); setSelectedCategory(''); }}
          >
            Clear
          </div>
        : null}
      </div>

          <ListCardPosts 
            data={postsToDisplay}
            loading={loading}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleLike={handleLike}
            likeLoading={likeLoading}
          />
      </div>
    </section>
  )
}
