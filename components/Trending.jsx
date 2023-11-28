import { DotsHorizontalIcon, SearchIcon } from "@heroicons/react/outline";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import React from "react";

export default function Trending() {
  return (
    <div className="hidden  lg:flex flex-col mx-7 mt-4 text-black dark:text-white">
      <div className="flex  space-x-3 bg-[#EFF3F4] dark:bg-white dark:bg-opacity-10 w-[300px] h-[44px] p-3 rounded-3xl">
        <SearchIcon className="w-6 text-gray-600" />
        <input
          className="bg-transparent
        focus:outline-none
        placeholder:text-gray-600"
          placeholder="Search Busy Bee"
        />
      </div>
      <div className="w-[300px] min-h-[500px/ maybe add later again? / bg-[#EFF3F4] dark:bg-white dark:bg-opacity-10 rounded-3xl mt-3">
        <h1 className="font-bold text-xl p-3">What's Happening?</h1>
        <TrendingLinks
          Title="#Next.js > React.js"
          Trending="Australia"
          TweetNumbers="999k"
          Link={"https://www.youtube.com/watch?v=5WFb1Vso9W0"}
        />
        <TrendingLinks
          Title="JavaScript"
          Trending="United States"
          TweetNumbers="66.7k"
          Link={"https://devdocs.io/javascript/"}
        />
        <TrendingLinks
          Title="Donald Trump"
          Trending="United States"
          TweetNumbers="199.2k"
          Link={"https://en.wikipedia.org/wiki/Donald_Trump"}
        />
        <TrendingLinks
          Title="Node.js"
          Trending="Australia"
          TweetNumbers="144k"
          Link={"https://nodejs.org/api/all.html"}
        />
      </div>

      {/* who to follow change this later!! */}
      <div className="w-[300px]         wsdwd bg-[#EFF3F4] dark:bg-white dark:bg-opacity-10 rounded-3xl mt-3">
        <h1 className="font-bold text-xl p-3">Who To Follow</h1>
        <WhoToFollow
          ProfilePicture={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/800px-Elon_Musk_Royal_Society_%28crop2%29.jpg"
          }
          AccountLink={"elonmusk"}
          Name={"Elon Musk"}
          TwitterLink={"https://twitter.com/elonmusk"}
        />
        <WhoToFollow
          ProfilePicture={
            "https://upload.wikimedia.org/wikipedia/commons/8/8d/President_Barack_Obama.jpg"
          }
          AccountLink={"BarackObama"}
          Name={"Barack Oba..."}
          TwitterLink={"https://twitter.com/BarackObama"}
        />
        <WhoToFollow
          ProfilePicture={
            "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
          }
          AccountLink={"Cristiano"}
          Name={"Cristiano Ro..."}
          TwitterLink={"https://twitter.com/Cristiano"}
        />
      </div>
    </div>
  );
}

function TrendingLinks({ Trending, Title, TweetNumbers, Link }) {
  return (
    <div className="p-3 relative">
      <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4" />
      <p className="text-xs text-gray-500">Trending in {Trending}</p>
      <h1 className="text-[15px] font-bold">
        <a href={Link} target="_blank">
          {Title}
        </a>
      </h1>
      <p className="text-xs text-gray-500">{TweetNumbers} Bumbles</p>
    </div>
  );
}

function WhoToFollow({ Name, ProfilePicture, AccountLink, TwitterLink }) {
  return (
    <div className="flex justify-between p-3">
      <div className="flex space-x-3">
        <img
          src={ProfilePicture}
          className="w-11 h-11 object-cover rounded-full"
        />
        <div>
          <div className="flex space-x-1 ">
            <h1 className="font-bold ">{Name}</h1>
            <BadgeCheckIcon className="w-[18px]  text-blue-400 " />
          </div>
          <h1 className="text-[12px] text-gray-500 mt-1">
            <a href={TwitterLink} target="_blank">
              @{AccountLink}
            </a>
          </h1>
        </div>
      </div>
      <button className="dark:bg-white bg-black text-white dark:text-black text-sm w-20 rounded-3xl font-bold h-8 ">
        Follow
      </button>
    </div>
  );
}
