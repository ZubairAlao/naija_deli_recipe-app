"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Profile from '@/app/ui/profile/profile'
import { useRouter } from 'next/navigation'

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

  export default function MyProfile() {

    const { data: session } = useSession();
    const router = useRouter();
    const [myPosts, setMyPosts] = useState<Post[]>([])
    const [likeLoading, setLikeLoading] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState(true);

    const userName = session?.user?.name || 'My';
    const userImage =  '/usernamePic.png'; 

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/users/${session?.user?.id}/posts`)
                const data: Post[] = await response.json();
                const sortedData = data.sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                setMyPosts(sortedData)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
              }

        }

        if (session?.user?.id) fetchPosts()
    }, [session?.user?.id]);

    console.log(session?.user);
    console.log(myPosts);
    console.log(userImage);

    const handleEdit = (post: Post) => {
        router.push(`/edit-recipe?id=${post._id}`);
    }

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
    
            const filteredPosts = myPosts.filter((p) => p._id !== post._id);
            setMyPosts(filteredPosts);
          } catch (error) {
            console.log(error);
          }
        }
      };

      // const handleLike = async (post: Post) => {
      //   if (!session) {
      //     alert('You must be logged in to like a post.');
      //     return;
      //   }
      //   setLikeLoading(prev => ({ ...prev, [post._id]: true }));
      //   try {
      //     const res = await fetch(`/api/likes/${post._id}`, {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({ userId: session?.user?.id }), // Send userId in request body
      //     });
    
      //     const data = await res.json();
    
      //     if (res.ok) {
      //       const updatedPosts = myPosts.map(p =>
      //         p._id === post._id ? { ...p, likes: data.likes } : p
      //       );
      //       setMyPosts(updatedPosts);
      //     }
      //   } catch (error) {
      //     console.error('Error liking the post:', error);
      //   } finally {
      //     setLikeLoading(prev => ({ ...prev, [post._id]: false }));
      //   }
      // };
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
                const updatedPosts = myPosts.map((p) =>
                    p._id === post._id
                        ? { ...p, likes: data.likes, likedBy: data.likedBy } // Update both likes and likedBy list 
                        : p
                );
                setMyPosts(updatedPosts);
            }
        } catch (error) {
            console.error('Error liking the post:', error);
        } finally {
            setLikeLoading(prev => ({ ...prev, [post._id]: false }));
        }
    };
    

    if (!session?.user) {
        return (
            <div className='h-screen w-full flex flex-col justify-center items-center bg-gray-100'>
                <p className='animate-bounce text-2xl font-semibold text-gray-800 mb-4'>
                    Oops! You are not signed in.
                </p>
                <p className='text-lg text-gray-600 mb-8'>
                    Please sign in to access your account and continue.
                </p>
            </div>
        );
    }

  return (
    <Profile
        name={userName}
        desc="Welcome to your personalized profile page"
        posts={myPosts}
        loading={loading}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleLike={handleLike}
        likeLoading={likeLoading}
    />
  )
}
