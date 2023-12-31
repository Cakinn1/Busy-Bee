import { auth } from "@/firebase";
import { closeLoginModal, closeSignupModal } from "@/redux/modalSlice";
import { signOutUser } from "@/redux/userSlice";
import {
  HomeIcon,
  HashtagIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  BellIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  MoonIcon,
  LightBulbIcon,
} from "@heroicons/react/outline";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBarThemeToggle from "./SideBarThemeToggle";

export default function SideBar() {
  const dispatch = useDispatch();
  async function handleSignOut() {
    await signOut(auth);
    dispatch(signOutUser());
    dispatch(closeSignupModal());
    dispatch(closeLoginModal());
  }

  const user = useSelector((state) => state.user);

  return (
    <div className="hidden sm:flex flex-col  fixed  h-full md:ml-3  xl:ml-24  ">
      <nav className="h-full relative xl:space-y-1.5 ">
        <div className="flex justify-center items-center py-3   xl:p-3 xl:justify-start">
          <Image
            src={"/assets/pfp.webp"}
            className="bg-white dark:bg-black"
            width={48}
            height={48}
          />
        </div>
        <SideBarLink Icon={HomeIcon} text={"Home"} />
        <SideBarLink Icon={HashtagIcon} text={"Explore"} />
        <SideBarLink Icon={BellIcon} text={"Notifications"} />
        <SideBarLink Icon={InboxIcon} text={"Messages"} />
        <SideBarLink Icon={BookmarkIcon} text={"Bookmarks"} />
        <SideBarLink Icon={UserIcon} text={"Profile"} />
        <SideBarThemeToggle sideBarLink={true} />
        <SideBarLink Icon={DotsCircleHorizontalIcon} text={"More"} />
        <button
          className="bg-[#1d9bf0 bg-[#F4AF01] text-black dark:text-white rounded-full h-[52px] w-[200px] font-bold
         text-lg mt-2 xl:inline hidden"
        >
          Bumble
        </button>
        <div
          onClick={handleSignOut}
          className=" bottom-0 hoverAnimation 
         cursor-pointer rounded-full absolute flex justify-center items-center space-x-3
         xl:p-3"
        >
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={user.photoUrl || "/assets/kylie.png"}
          />
          <div className="hidden xl:inline">
            <h1 className="font-bold whitespace-nowrap dark:text-white text-black">
              {user.name}
            </h1>
            <h1 className="text-gray-500">@{user.username}</h1>
          </div>
          <DotsHorizontalIcon className="h-5 dark:text-white text-black" />
        </div>
      </nav>
    </div>
  );
}

function SideBarLink({ text, Icon }) {
  return (
    <li className="hoverAnimation flex mb-3 xl:justify-start justify-center items-center text-xl space-x-3">
      <Icon className="h-7 text-black dark:text-white" />
      <span className="hidden xl:inline text-black dark:text-white">
        {text}
      </span>
    </li>
  );
}
