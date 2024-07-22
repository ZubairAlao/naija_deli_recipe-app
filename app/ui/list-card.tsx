"use client";

import { ClockIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Post } from "@/app/ui/types";
import { convertToReadableDate } from "@/utils/dateUtils";

interface ListCardProps {
    post: Post;
    handleEdit?: () => void;
    handleDelete?: () => void;
    handleLike?: () => void;
    likeLoading: boolean;
} 

const ListCard: React.FC<ListCardProps> = ({ post, handleEdit, handleDelete, handleLike, likeLoading }) => {
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);

    // const hasUserLiked = () => {
    //     const userId = session?.user?.id;
    //     return userId ? post.likedBy.includes(userId) : false;
    // };

    const handleProfileClick = () => {
        console.log(post);
    
        if (post.creator._id === session?.user?.id) return router.push("/profile");
    
        router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
    };

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const readableCreatedAt = convertToReadableDate(post.createdAt);

    return (
        <div className="rounded-xl bg-white w-full shadow-sm mx-auto flex flex-col mb-4">
            {/* Header */}
            <div className="flex items-center p-3 bg-gray-50">
                <Image
                    src={post.creator.image}
                    alt="user_image"
                    width={40}
                    height={40}
                    onClick={handleProfileClick}
                    className="rounded-full object-contain cursor-pointer"
                />
                <div className="ml-3">
                    <h3 className="text-sm font-medium cursor-pointer" onClick={handleProfileClick}>{post.creator.username}</h3>
                    <p className="text-xs text-[#008000] font-bold mb-2 mr-auto">Created At {readableCreatedAt}</p>
                </div>
            </div>

            {/* Content */}
            <div className="relative w-full h-48 overflow-hidden">
                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    style={{
                    objectFit: 'cover',
                    }}
                    className="rounded-t-md"
                />
            </div>
            <div className="p-4">
                <h3 className="text-base font-medium mb-2">{post.title}</h3>
                <p className="text-sm text-gray-700 mb-2">{isExpanded ? post.walkthrough : `${post.walkthrough.slice(0, 70)}...`}
                    <button
                        className="text-[#008000] ml-1"
                        onClick={toggleReadMore}
                    >
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                </p>
                <p className="text-xs bg-[#008000] rounded-md p-2 text-white mb-2">{post.ingredients}</p>
                <p className="text-sm text-[#008000] font-bold mb-2">#{post.categories}</p>
                <div className="flex items-center text-xs text-gray-500 mr-auto">
                    <ClockIcon className="h-4 w-4" />
                    <span className="ml-1 text-[#008000]">{post.time} Min</span>
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-3 bg-gray-50 mt-auto">
                <div className="flex items-center">
                {session && session.user && (
                    likeLoading ? 
                    <div className="mx-auto flex justify-center items-center space-x-1 animate-pulse">
                        <div className="bg-gray-500 shadow-sm rounded-full w-1 h-1"></div>
                        <div className="bg-gray-500 shadow-sm rounded-full w-1 h-1"></div>
                        <div className="bg-gray-500 shadow-sm rounded-full w-1 h-1"></div>
                    </div> : 
                    <HeartIcon className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-400 shadow-sm" onClick={handleLike} />
                )}
                    <span className="ml-1 text-sm">{post.likes} likes</span>
                </div>
                <div className="flex items-center">
                    {session && session.user?.id === post.creator?._id && (
                        <>
                            <button 
                                className="text-sm text-blue-500 mr-2"
                                onClick={handleEdit}
                            >
                                Edit
                            </button>
                            <button 
                                className="text-sm text-red-500"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListCard;
