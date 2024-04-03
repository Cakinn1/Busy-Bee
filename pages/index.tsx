import Head from "next/head";
import { Inter } from "@next/font/google";
import SideBar from "@/components/SideBar";
import PostFeed from "@/components/PostFeed";
import Trending from "@/components/Trending";
import BottomBanner from "@/components/BottomBanner";
import { useSelector } from "react-redux";
import CommentModal from "@/components/modals/CommentModal";
import { useContext, useEffect, useState } from "react";
import Loading from "@/components/Loading";
import payments, { loadCheckout } from "../lib/stripe";
import { getProducts } from "@stripe/firestore-stripe-payments";
import StripeModal from "@/components/modals/StripeModal";
import React from "react";
import { RootState } from "@/redux/store";
import FeedContext from "@/context/FeedContext";
import LoadingBar from "react-top-loading-bar";
import ProgressContext, { progressContext } from "@/context/ProgressContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const username = useSelector((state: RootState) => state.user.username);
  const { progress, setProgress } = useContext(progressContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    <>
      <Head>
        <title>Busy Bee</title>
      </Head>
      <ProgressContext>
        {isLoading && <Loading />}
        <div
          className="bg-white dark:bg-black duration-100 min-h-screen   text-[#E7E9EA] md:justify-cente max-w-[1400px] mx-auto
       flex"
        >
          <FeedContext>
            <SideBar />
            <PostFeed isLoading={isLoading} />
          </FeedContext>
          <Trending />
        </div>
        <CommentModal />

        <StripeModal />
        {!username && <BottomBanner />}
      </ProgressContext>
    </>
  );
}
// TODO: 1. Implement a modal/pop up to change dark mode/lightmode theme based on users system color
// TODO: 2. Find a better image for "busy Bee" on dark mode
// TODO: 3. Add unit test within application
// TODO: 4. Insert "bookmark" into all post database
// TODO: 5. Fix premium/stripe payment system
// TODO: 6. Fix premium UI modal
// TODO: 7. Add messaging into application
// TODO: 8. Add social profiles into application basically a mini instagram clone
// TODO: 9. Make bookmarks private for the selected user
// TODO: 10. Fix bottom right username and email to always fit within the width
// TODO: 11. Fix tweets/bookmarks to always fit the width of email and username
// TODO: 12 P1. Have Search Busy Bee to actually load tweets by name in a broswer window around 400px high
// TODO: 12 P2. the users should be able to click on the post and load that current post with how i am already doing it right now.
