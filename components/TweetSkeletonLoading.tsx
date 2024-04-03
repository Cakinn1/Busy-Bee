import React from "react";

export default function TweetSkeletonLoading() {
  return (
    <div className="h-[120px]  flex-1 flex gap-x-4 p-4 text-black mb-10/">
      <div className="rounded-full h-12 object-cover w-12 bg-gray-300 animate-pulse"></div>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="bg-gray-300 animate-pulse  flex flex-1 h-6"></div>
        <div className="bg-gray-300 animate-pulse flex flex-1 h-6"></div>
        <div className="flex w-fit gap-x-4">
          <div className="bg-gray-300 animate-pulse flex flex-1 h-6 w-6 rounded-full"></div>
          <div className="bg-gray-300 animate-pulse flex flex-1 h-6 w-6 rounded-full"></div>
          <div className="bg-gray-300 animate-pulse flex flex-1 h-6 w-6 rounded-full"></div>
          <div className="bg-gray-300 animate-pulse flex flex-1 h-6 w-6 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
