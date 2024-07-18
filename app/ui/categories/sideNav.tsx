import { TagIcon } from '@heroicons/react/24/solid';

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
  creator: {
    _id: string;
    email: string;
    username: string;
    image: string;
    __v: number;
    createdAt: string;
  };
}

interface SideNavProps {
  data: Post[];
  categoryClick: (tag: string) => void;
}

export default function SideNav({ data, categoryClick }: SideNavProps) {
  return (
    <div className='fixed top-12 left-0 md:h-auto w-full md:w-48 bg-green-900 shadow-md z-20'>
      <div className='pt-4 md:py-14'>
        <div className='flex gap-2 justify-center text-green-300'>
          <p>Categories</p>
          <TagIcon className='h-5 w-5' />
        </div>

        <div className='flex items-center justify-center md:block'>
          {data.map((post) => (
            <button
              key={post._id}
              onClick={() => categoryClick(post.categories)}
              className='block py-2 px-4 text-green-300 hover:bg-green-700 hover:text-white transition duration-200'
            >
              {post.categories}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


