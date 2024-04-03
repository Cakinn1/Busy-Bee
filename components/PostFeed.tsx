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
  bookmark?: string;
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
  const [tweets, setTweets] = useState<QueryDocumentSnapshot[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { feed } = useContext(feedContext);
  async function fetchQuery() {
    try {
      setLoading(true);
      // Simulate loading state effect
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const collectionName = feed === "tweets" ? "posts" : "bookmark";

      const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setLoading(false);
        // console.log(snapshot.docs);
        // const data = snapshot.docs.map((item) => item.data());
        setTweets(snapshot.docs);

        // if (feed === "tweets") {
        //   setTweets(data);
        // } else {
        //   const t = data?.filter((item) => item?.bookmark?.length > 0);
        //   setTweets(data)
        // }
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
      {loading
        ? new Array(8).fill(0).map((_, index) => {
            return <TweetSkeletonLoading key={index} />;
          })
        : tweets.map((tweet) => {
            const documentData = tweet.data();

            const tweetData: DataProps = {
              likes: documentData.likes || [],
              image: documentData.image || "",
              comments: documentData.comments || [],
              badge: documentData.badge || "",
              bookmark: documentData.bookmark || "",
              name: documentData.name,
              photoUrl: documentData.photoUrl,
              timestamp: (
                <Moment fromNow>{documentData.timestamp?.toDate()}</Moment>
              ),
              tweet: documentData.tweet,
              uid: documentData.uid,
              username: documentData.username,
            };
            return <Tweet key={tweet.id} id={tweet.id} data={tweetData} />;
          })}
    </div>
  );
}
