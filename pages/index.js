import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import SideBar from "@/components/SideBar";
import PostFeed from "@/components/PostFeed";
import Trending from "@/components/Trending";
import BottomBanner from "@/components/BottomBanner";
import { useSelector } from "react-redux";
import CommentModal from "@/components/modals/CommentModal";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
require("dotenv").config();

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const username = useSelector((state) => state.user.username);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [isLoading]);
  return (
    <div>
      {isLoading && <Loading />}

      <div
        className="bg-white dark:bg-black min-h-screen  text-[#E7E9EA] max-w-[1400px] mx-auto
       flex"
      >
        <SideBar />
        <PostFeed isLoading={isLoading} />
        <Trending />
      </div>
      <CommentModal />
      {!username  && <BottomBanner />}
    </div>
  );
}

//fix env file not working, add a way to change mode based on system light/dark mode. (make it a pop up)
// add toggle feature for lgiht and dark mode on lower breakpoint (iphone)
// change isLoading to redux later (not need at the moment most likely overkill tbh)