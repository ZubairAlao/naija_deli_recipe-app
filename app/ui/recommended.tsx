'use client'

import { useState, useEffect } from "react";
import { lato } from "@/app/ui/fonts";
import { HeartIcon, ClockIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { RecommendedSkeleton } from "./skeletons";

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
          <h3 className="text-sm md:text-base font-medium">{post.title} - {post.description}</h3>
          <span className="flex items-center">
            {/* <HeartIcon className="h-5 w-5 text-gray-700 text-sm" /> */}
            <span className="ml-1 text-sm">{post.likes} likes</span>
          </span>
        </div>

        {/* <p className={`${lato.className} rounded-xl bg-white px-4 py-2 md:py-8 text-center text-sm md:text-base mb-2 md:mb-4`}>
          {post.description}
        </p> */}

        <p className={`${lato.className} rounded-xl bg-white px-4 py-2 md:py-8 text-center text-sm md:text-base mb-2 md:mb-4`}>
          {post.walkthrough}
        </p>

        <div className="flex justify-between items-center">
          <h3 className="text-sm md:text-base font-medium">By: {post.creator.username}</h3>
          <span className="flex items-center">
            <ClockIcon className="h-5 w-5 text-gray-700" />
            <span className="ml-1 text-sm md:text-base">{post.time}Min</span>
          </span>
        </div>
      </div>
    </div>
  );
}
