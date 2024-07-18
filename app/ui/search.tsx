'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { ChangeEvent } from 'react';

interface SearchProps {
  searchText: string;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ searchText, handleSearchChange }) => {
  return (
    <div className="relative flex flex-col items-center flex-1 flex-shrink-0 max-w-[800px] w-full mx-auto">
      <p className='mb-2'>I would like to cook...</p>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        className="peer block w-full rounded-md border border-orange-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={"search Recipe"}
        value={searchText}
        onChange={handleSearchChange}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-3/4 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

export default Search;
