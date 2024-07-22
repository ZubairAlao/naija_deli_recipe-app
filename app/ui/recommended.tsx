'use client'

import { useState, useEffect } from "react";
import { lato } from "@/app/ui/fonts";
import { HeartIcon, ClockIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { RecommendedSkeleton } from "./skeletons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

export default function Recommended() {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const fetchPost = async () => {
    try {
      const response = await fetch('/api/post', { next: { revalidate: 10 } });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.length > 0) {
        const mostLikedPost = data.reduce((prev: { likes: number; }, current: { likes: number; }) => (prev.likes > current.likes ? prev : current));
        setPost(mostLikedPost);
      }
      setError(null); // Clear any previous errors
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <RecommendedSkeleton />;
  }

  const handleUsernameClick = () => {
    if (post.creator._id === session?.user?.id) return router.push("/profile");
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <div className="rounded-xl bg-gray-50 shadow-sm max-w-4xl mx-auto w-full overflow-hidden grid grid-cols-[80px_1fr] md:grid-cols-[250px_1fr] gap-2">
      <div className="relative w-60 h-40 md:h-auto overflow-hidden rounded-full -mx-40 md:rounded-md md:mx-0">
        <Image
          src={post.imageUrl}
          alt="Recommended recipe"
          sizes="(min-width: 808px) 50vw, 100vw"
          fill
          style={{
            objectFit: 'cover',
          }}
          priority
          className="rounded-md"
        />
      </div>

      <div className="flex flex-col justify-between p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs md:text-sm font-medium">{post.title} - {post.description}</h3>
          <span className="flex items-center">
            <span className="ml-1 text-xs">{post.likes} likes</span>
          </span>
        </div>

        <div className={`${lato.className} rounded-xl bg-white px-4 py-2 md:py-2 text-left text-xs md:text-sm mb-2 md:mb-4`}>
          <p>{post.walkthrough}</p>
          <p>Ingredients: {post.ingredients}</p>
        </div>

        <div className="flex justify-between items-center">
          <h3 onClick={handleUsernameClick} className="text-xs md:text-sm font-medium cursor-pointer hover:text-gray-500">By: {post.creator.username}</h3>
          <span className="flex items-center">
            <ClockIcon className="h-4 w-4 text-gray-700" />
            <span className="ml-1 text-xs">{post.time}Min</span>
          </span>
        </div>
      </div>
    </div>
  );
}
