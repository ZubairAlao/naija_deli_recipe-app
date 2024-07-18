"use client";

import { HeartIcon, ClockIcon } from "@heroicons/react/24/outline";


export const ListCardSkeleton: React.FC = () => {
    return (
        <div className="rounded-xl bg-white w-full shadow-sm mx-auto flex flex-col mb-4 animate-pulse">
            {/* Header */}
            <div className="flex items-center p-3 bg-gray-50">
                <div className="rounded-full bg-gray-300" style={{ width: 40, height: 40 }} />
                <div className="ml-3">
                    <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                    <div className="flex items-center text-xs text-gray-500">
                        <ClockIcon className="h-4 w-4" />
                        <span className="ml-1 h-3 bg-gray-300 rounded w-12"></span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="relative w-full h-64 bg-gray-300 rounded-t-md"></div>
            <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-3 bg-gray-50">
                <div className="flex items-center">
                    <HeartIcon className="h-5 w-5 text-gray-300" />
                    <span className="ml-1 h-3 bg-gray-300 rounded w-6"></span>
                </div>
                <div className="flex items-center">
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                    <div className="h-4 bg-gray-300 rounded w-16 ml-2"></div>
                </div>
            </div>
        </div>
    );
}


export const RecommendedSkeleton = () => {
    return (
      <div className="rounded-xl bg-gray-50 shadow-sm max-w-4xl mx-auto w-full overflow-hidden grid grid-cols-[80px_1fr] md:grid-cols-[250px_1fr] gap-2 animate-pulse">
        <div className="relative w-60 h-40 md:h-auto overflow-hidden rounded-full -mx-40 md:rounded-md md:mx-0 bg-gray-300"></div>
  
        <div className="flex flex-col justify-between p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="w-32 h-4 bg-gray-300 rounded-md"></div>
            <span className="flex items-center">
              <div className="w-12 h-4 bg-gray-300 rounded-md ml-1"></div>
            </span>
          </div>
  
          <div className="rounded-xl bg-gray-200 px-4 py-2 md:py-8 text-center text-sm md:text-base mb-2 md:mb-4 h-20"></div>
  
          <div className="flex justify-between items-center">
            <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
            <span className="flex items-center">
              <div className="w-12 h-4 bg-gray-300 rounded-md ml-1"></div>
            </span>
          </div>
        </div>
      </div>
    );
  };

