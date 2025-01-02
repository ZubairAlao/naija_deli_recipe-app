'use client'

import { useState, useEffect, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import Search from "@/app/ui/search";
import Recommended from "@/app/ui/recommended";
import { GreenButton } from "@/app/ui/button";
import ListCard from "@/app/ui/list-card";
import { useRouter } from 'next/navigation';
import { ListCardSkeleton } from "./skeletons";
import Link from "next/link";



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
  if (data.length === 0) {
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

const Feed: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState<Record<string, boolean>>({});
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);
  const [sortCriteria, setSortCriteria] = useState<'latest' | 'popular'>('latest');
  const { data: session } = useSession();

  const router = useRouter();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/post/`);

      if(!response.ok) {
        // throw new Error(`Error: ${response.status} : ${response.statusText}`)
        window.location.reload()
        throw new Error(`Slow Server Detected, Kindly Refresh to Continue `)
      }

      const data = await response.json()
       console.log("from response", data);

      const sortedData = data.sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setAllPosts(sortedData);
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

        const filteredPosts = allPosts.filter((p) => p._id !== post._id);
        setAllPosts(filteredPosts);

        router.refresh() // refresh and fetch new request
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    router.refresh()
    fetchPosts();
  }, []);

  const filterPosts = (searchedText: string): Post[] => {
    const regex = new RegExp(searchedText, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.categories) ||
        regex.test(item.title) ||
        regex.test(item.description) ||
        regex.test(item.ingredients) ||
        regex.test(item.walkthrough)
    );
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchText(e.target.value);

    const timeout = setTimeout(() => {
      const searchResult = filterPosts(e.target.value);
      setSearchedResults(searchResult);
    }, 500);

    setSearchTimeout(timeout);
  };

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
            // Update the local posts state immediately after liking
            const updatedPosts = allPosts.map((p) =>
                p._id === post._id
                    ? { ...p, likes: data.likes, likedBy: data.likedBy }
                    : p
            );
            setAllPosts(updatedPosts);

            // Update searchedResults if it's being displayed
            if (searchedResults.length > 0) {
                const updatedSearchedResults = searchedResults.map((p) =>
                    p._id === post._id
                        ? { ...p, likes: data.likes, likedBy: data.likedBy }
                        : p
                );
                setSearchedResults(updatedSearchedResults);
            }
        }
    } catch (error) {
        console.error('Error liking the post:', error);
    } finally {
        setLikeLoading((prev) => ({ ...prev, [post._id]: false }));
    }
};


  const handlePopularClick = () => {
    setSortCriteria('popular');
    const sortedByLikes = [...allPosts].sort((a, b) => b.likes - a.likes);
    setAllPosts(sortedByLikes);

    // Update searchedResults if it's being displayed
    if (searchedResults.length > 0) {
      const sortedByLikes = [...searchedResults].sort((a, b) => b.likes - a.likes);
      setSearchedResults(sortedByLikes);
    }
  };

  const handleLatestClick = () => {
    setSortCriteria('latest');
    const sortedByDate = [...allPosts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setAllPosts(sortedByDate);

    // Update searchedResults if it's being displayed
    if (searchedResults.length > 0) {
      const sortedByDate = [...searchedResults].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setSearchedResults(sortedByDate);
    }
  };


  // console.log(allPosts);
  

  return (
    <section className="px-8 w-full max-w-7xl mx-auto">
      <div className="py-4 space-y-5 mb-8">
        <Search searchText={searchText}  handleSearchChange={handleSearchChange}/>
        {searchedResults.length > 0 ?
        null
         :
         <div className="space-y-5">
          <p className="text-left text-lg font-semibold">Recommended</p>
          <Recommended />
        </div>
         }
      </div>
      <div className="flex">
        <p className="text-lg font-semibold mb-4"> {sortCriteria === "latest" ? "Latest" : "Popular"} Posts</p>
        <div className="flex gap-4 ml-auto">
        <GreenButton onClick={handlePopularClick} disabled={sortCriteria === "popular"}>Popular</GreenButton>
        <GreenButton onClick={handleLatestClick} disabled={sortCriteria === "latest"}>Latest</GreenButton>
        </div>
      </div>
      {error && <div className="text-red-500">
         {/* <p>{error}</p> */}
         <p className="text-green-500">loading...</p>
         {/* <GreenButton className="flex justify-center my-6" onClick={() => window.location.reload()}>Refresh</GreenButton> */}
      </div>}

      <div className="mr-auto">
        <ListCardPosts
          data={searchedResults.length > 0 ? searchedResults : allPosts}
          loading={loading}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleLike={handleLike}
          likeLoading={likeLoading}
        />
      </div>
    </section>
  );
};

export default Feed;
