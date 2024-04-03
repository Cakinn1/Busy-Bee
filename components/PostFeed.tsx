import { db } from "@/lib/firebase";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import Tweet from "./Tweet";
import TweetInput from "./TweetInput";
import TweetSkeletonLoading from "./TweetSkeletonLoading";
import Moment from "react-moment";
import { feedContext } from "@/context/FeedContext";

export interface DataProps {
  badge?: string;
  image?: string;
  comments?: CommentsProps[] | [];
  bookmark?: string[] | [];
  likes: string[] | [];
  name: string;
  photoUrl: string;
  timestamp: React.ReactElement;
  tweet: string;
  uid: string;
  username: string;
}

export interface CommentsProps {
  comment: string;
  name: string;
  photoUrl: string;
  username: string;
}

export default function PostFeed({ isLoading }: { isLoading: boolean }) {
  const [tweets, setTweets] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { feed } = useContext(feedContext);
  async function fetchQuery() {
    try {
      setLoading(true);
      // Simulate loading state effect
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setLoading(false);
        // all data needed for firestore
        const data = snapshot.docs.map((item) => ({
          id: item.id,
          data: item.data(),
        }));

        if (feed === "tweets") {
          setTweets(data);
        } else {
          const bookmarkedTweets = data?.filter(
            (item) => item.data.bookmark && item?.data?.bookmark?.length > 0
          );
          setTweets(bookmarkedTweets);
        }
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
  }, [feed]);

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
      {loading ? (
        new Array(8).fill(0).map((_, index) => {
          return <TweetSkeletonLoading key={index} />;
        })
      ) : tweets.length > 0 ? (
        tweets.map((tweet) => {
          const tweetData: DataProps = {
            likes: tweet.data.likes || [],
            image: tweet.data.image || "",
            comments: tweet.data.comments || [],
            badge: tweet.data.badge || "",
            bookmark: tweet.data.bookmark || [],
            name: tweet.data.name,
            photoUrl: tweet.data.photoUrl,
            timestamp: (
              <Moment fromNow>{tweet.data.timestamp?.toDate()}</Moment>
            ),
            tweet: tweet.data.tweet,
            uid: tweet.data.uid,
            username: tweet.data.username,
          };
          return <Tweet key={tweet.id} id={tweet.id} data={tweetData} />;
        })
      ) : (
        <NothingBookmarked />
      )}
    </div>
  );
}

function NothingBookmarked() {
  return (
    <div className="items-center p-4 space-y-2 flex flex-col text-black justify-center  ">
      <h1 className="font-bold text-3xl lg:text-4xl ">
        You have nothing book marked
      </h1>
      <h2 className="text-sm md:text-base">
        Add something to bookmarks by clicking on bookmark icon.
      </h2>
    </div>
  );
}
