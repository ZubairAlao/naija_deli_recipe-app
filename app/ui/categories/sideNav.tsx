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
  // Use reduce to ensure unique categories
  const uniqueCategories = data.reduce<string[]>((acc, post) => {
    if (!acc.includes(post.categories)) {
      acc.push(post.categories);
    }
    return acc;
  }, []);

  return (
    <div className='fixed top-12 left-0 md:h-auto w-full md:w-48 bg-[#008000] shadow-md z-20'>
      <div className='pt-4 md:py-14'>
        <div className='flex gap-2 justify-center text-white'>
          <p>Categories</p>
          <TagIcon className='h-5 w-5' />
        </div>

        <div className='flex items-center justify-center md:block'>
          {uniqueCategories.map((category) => (
            <button
              key={category}
              onClick={() => categoryClick(category)}
              className='block py-2 px-4 text-white hover:text-[#ffa500] transition duration-200'
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
