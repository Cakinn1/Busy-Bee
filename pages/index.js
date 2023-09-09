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

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const username = useSelector((state) => state.user.username);
  console.log(username);
  return (
    <div>
      <div
         className="bg-black min-h-screen  text-[#E7E9EA] max-w-[1400px] mx-auto
       flex"
      >
        <SideBar />

        <PostFeed />
        <Trending />
      </div>
      <CommentModal />
      {!username && <BottomBanner />}
    </div>
  );
}
