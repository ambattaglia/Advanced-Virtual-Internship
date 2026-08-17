import React from "react";

export function CardSkeleton() {
  return (
    <div className="flex flex-col w-[160px] md:w-[200px] border border-gray-100 rounded-xl overflow-hidden animate-pulse shrink-0 bg-white">
      <div className="aspect-[2/3] w-full bg-gray-200"></div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        <div className="mt-auto flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}

export function SelectedBookSkeleton() {
  return (
    <div className="w-full bg-gray-100 rounded-2xl p-6 flex flex-col md:flex-row gap-6 animate-pulse border border-gray-200/50">
      {/* Cover */}
      <div className="w-[140px] h-[210px] md:w-[160px] md:h-[240px] bg-gray-200 rounded-lg shrink-0 mx-auto md:mx-0"></div>
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center py-2 gap-4">
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-32 mt-2"></div>
      </div>
    </div>
  );
}
