import ListCard from "../list-card";
import Image from "next/image";
import { ListCardSkeleton } from "../skeletons";

interface UserProfileProps {
    params: {
        id: string;
    };
}

interface Post {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    imagePublicId: string;
    ingredients: string;
    likes: number;
    time: number;
    walkthrough: string;
    categories: string;
    __v: number;
    createdAt: string;
    likedBy: string[];
    creator: {
        _id: string;
        email: string;
        username: string;
        image: string;
        __v: number;
        createdAt: string;
    };
}

interface ProfileProps {
    posts: Post[];
    name: string;
    desc: string;
    loading: boolean;
    likeLoading: Record<string, boolean>;
    handleEdit: (post: Post) => void;
    handleDelete: (post: Post) => void;
    handleLike: (post: Post) => void;
}

const Profile: React.FC<ProfileProps> = ({ name, desc, posts, loading, handleEdit, handleDelete, handleLike, likeLoading }) => {

    return (
        <section className="w-full mt-[80px] px-8">
            <div className="bg-gray-50 w-full max-w-6xl mx-auto p-8 rounded-lg shadow-md">
                <div className="flex text-center items-center flex-col sm:flex-row space-x-6">
                    <div className="relative w-16 h-16 sm:w-28 sm:h-28">
                        {posts.map((post) => (
                            <Image
                                src={post.creator.image}
                                alt={post.creator.username}
                                key={post._id}
                                fill
                                priority
                                style={{ objectFit: 'cover' }}
                                className="rounded-full border-2 border-gray-300"
                            />
                        ))}
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold">
                            {name}
                        </h1>
                        <p className="mt-2 text-gray-600">{desc}</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">{name} Posts</h2>
                {loading && 
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-8">
                        <ListCardSkeleton />
                        <ListCardSkeleton />
                        <ListCardSkeleton />
                    </div>
                }
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {posts.map((post) => (
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
            </div>
        </section>
    );
};

export default Profile;
