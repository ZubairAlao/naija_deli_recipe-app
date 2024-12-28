import { useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);

  // Use reduce to ensure unique categories
  const uniqueCategories = data.reduce<string[]>((acc, post) => {
    if (!acc.includes(post.categories)) {
      acc.push(post.categories);
    }
    return acc;
  }, []);

  return (
    <div className="fixed top-12 left-0 md:h-auto w-full md:w-48 bg-[#008000] shadow-md z-20">
      <div className="pt-4 md:py-14 py-3 md:min-h-screen max-md:flex justify-between items-center px-6">
        <div className="flex gap-2 justify-center text-white">
          <p>Categories</p>
          <TagIcon className="h-5 w-5" />
        </div>

        {/* Dropdown */}
        <div className="relative flex justify-center items-center max-md:pt-0 pt-4">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="bg-white text-[#008000] text-sm px-4 py-2 rounded shadow hover:bg-gray-200"
          >
            {isOpen ? 'Close Categories' : 'Select Category'}
          </button>

          {isOpen && (
            <div
              className="absolute top-12 left-1/2 -translate-x-1/2 w-48 max-h-64 bg-white shadow-lg rounded z-30 overflow-y-auto mt-1 md:mt-3"
            >
              {uniqueCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    categoryClick(category);
                    setIsOpen(false); // Close dropdown after selection
                  }}
                  className="block w-full text-left px-4 py-2 text-[#008000] hover:bg-gray-100"
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
