import { DotsHorizontalIcon, SearchIcon } from "@heroicons/react/outline";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import React from "react";

export default function Trending() {
  return (
    <div className="hidden lg:flex flex-col ml-7 mt-4">
      <div className="flex space-x-3 bg-white bg-opacity-10 w-[300px] h-[44px] p-3 rounded-3xl">
        <SearchIcon className="w-6 text-gray-600" />
        <input
          className="bg-transparent
        focus:outline-none
        placeholder:text-gray-600"
          placeholder="Search Twitter"
        />
      </div>
      {/* whats happening change this later!!! */}
      <div className="w-[300px] h-[500px] bg-white bg-opacity-10 rounded-3xl mt-3">
        <h1 className="font-bold text-xl p-3">What's Happening</h1>
        <div className="p-3 relative">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending in Australia</p>
          <h1 className="text-[15px] font-bold">Red Bull</h1>
          <p className="text-xs text-gray-500">28.1K Tweets</p>
        </div>
        <div className="p-3 relative">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending in Australia</p>
          <h1 className="text-[15px] font-bold">#Deadpool3</h1>
          <p className="text-xs text-gray-500">19.8K tweets</p>
        </div>
        <div className="p-3 relative">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending in Australia</p>
          <h1 className="text-[15px] font-bold">China</h1>
          <p className="text-xs text-gray-500">340K Tweets</p>
        </div>
        <div className="p-3 relative">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending in Australia</p>
          <h1 className="text-[15px] font-bold">NATO</h1>
          <p className="text-xs text-gray-500">881K Tweets</p>
        </div>
        <div className="p-3 relative">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
          <p className="text-xs text-gray-500">Trending in Australia</p>
          <h1 className="text-[15px] font-bold">Napoleon</h1>
          <p className="text-xs text-gray-500">66.7K Tweets</p>
        </div>
        
      </div>

      {/* who to follow change this later!! */}
      <div className="w-[300px] h-[300px] bg-white bg-opacity-10 rounded-3xl mt-3">
        <h1 className="font-bold text-xl p-3">Who to follow</h1>
        <div className="flex justify-between p-3">
          <div className="flex space-x-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/800px-Elon_Musk_Royal_Society_%28crop2%29.jpg"
              className="w-11 h-11 object-cover rounded-full"
            />
            <div>
              <div className="flex space-x-1">
                <h1 className="font-bold">Elon Musk</h1>
                <BadgeCheckIcon className="w-[18px] text-blue-400" />
              </div>
              <h1 className="text-[12px] text-gray-500 mt-1">@elonmusk</h1>
            </div>
          </div>
          <button className="bg-white text-black text-sm w-20 rounded-3xl font-bold h-8 ">
            Follow
          </button>
        </div>
        <div className="flex justify-between p-3">
          <div className="flex space-x-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/8d/President_Barack_Obama.jpg"
              className="w-11 h-11 object-cover rounded-full"
            />
            <div>
              <div className="flex space-x-1">
                <h1 className="font-bold">Barack Oba...</h1>
                <BadgeCheckIcon className="w-[18px] text-blue-400" />
              </div>
              <h1 className="text-[12px] text-gray-500 mt-1">@BarackObama</h1>
            </div>
          </div>
          <button className="bg-white text-black text-sm w-20 rounded-3xl font-bold h-8 ">
            Follow
          </button>
        </div>
        <div className="flex justify-between p-3">
          <div className="flex space-x-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
              className="w-11 h-11 object-cover rounded-full"
            />
            <div>
              <div className="flex space-x-1 ">
                <h1 className="font-bold ">Cristiano Ro...</h1>
                <BadgeCheckIcon className="w-[18px]  text-blue-400 " />
              </div>
              <h1 className="text-[12px] text-gray-500 mt-1">@Cristiano</h1>
            </div>
          </div>
          <button className="bg-white text-black text-sm w-20 rounded-3xl font-bold h-8 ">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
