"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Profile from '@/app/ui/profile/profile'
import { useSession } from 'next-auth/react'


interface UserProfileProps {
    params: {
        id: string
    }
}

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

  export default function UserProfile({ params }: UserProfileProps) {

    const searchParams = useSearchParams()
    const { data: session } = useSession();

    const userName = searchParams.get("name") || "";
    const userImage =  '/usernamePic.png';

    const [userPosts, setUserPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true);
    const [likeLoading, setLikeLoading] = useState<Record<string, boolean>>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/users/${params?.id}/posts`);
          const data: Post[] = await response.json();

          const sortedData = data.sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setUserPosts(sortedData);
          setError(null);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unexpected error occurred.");
          }
        } finally {
          setLoading(false);
        }
      };
      
      if (params?.id) {
        fetchPosts();
      }
    }, [params.id]);

    const handleEdit = (post: Post) => {
        // Implement edit logic here
    }

    const handleDelete = (post: Post) => {
        // Implement delete logic here
    }

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
          const updatedPosts = userPosts.map(p =>
            p._id === post._id ? { ...p, likes: data.likes, likedBy: data.likedBy } : p
          );
          setUserPosts(updatedPosts);
        }
      } catch (error) {
        console.error('Error liking the post:', error);
      } finally {
        setLikeLoading(prev => ({ ...prev, [post._id]: false }));
      }
    };

  return (
    <Profile
        name={userName}
        desc={`Welcome to ${userName} personalized profile page`}
        posts={userPosts}
        loading={loading}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleLike={handleLike}
        likeLoading={likeLoading}
    />
  )
}
