import { db } from "@/lib/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import Tweet from "./Tweet";
import TweetInput from "./TweetInput";
import TweetSkeletonLoading from "./TweetSkeletonLoading";

export default function PostFeed({ isLoading }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchQuery() {
    try {
      setLoading(true);
      // Simulate loading state effect
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setTweets(snapshot.docs);
        setLoading(false);
      });
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      throw error;
    }
  }

  useEffect(() => {
    fetchQuery();
  }, []);

  return (
    <div
      className="sm:ml-16  xl:ml-[350px] max-w-2xl flex-grow
     dark:border-gray-700 border-gray-200 border-x dark:border-x"
    >
      <div
        className={`px-3 py-2 text-lg sm:text-xl font-bold
       backdrop-blur-sm  border-b dark:border-b dark:border-gray-700 text-black dark:text-white sticky top-0 ${
         isLoading ? "" : "z-50"
       }`}
      >
        Home
      </div>
      <TweetInput />
      {loading
        ? new Array(8).fill(0).map((_, index) => {
            return <TweetSkeletonLoading key={index} />;
          })
        : tweets.map((tweet) => {
            return <Tweet key={tweet.id} id={tweet.id} data={tweet.data()} />;
          })}
    </div>
  );
}
