import SideBar from "@/components/SideBar";
import Trending from "@/components/Trending";
import Tweet from "@/components/Tweet";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

import Moment from "react-moment";
import Link from "next/link";
import { useSelector } from "react-redux";

export async function getServerSideProps(context) {
  const id = context.query.id;
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const formattedData = {
    username: data.username,
    name: data.name,
    photoUrl: data.photoUrl,
    text: data.tweet,
    comments: data.comments || null,
    timestamp: JSON.stringify(data.timestamp.toDate()),
    image: data.image || null,
  };
  return {
    props: {
      tweetData: formattedData,
    },
  };
}
// dark:border-b border-b border-gray-200 dark:border-gray-700
export default function CommentsPage({ tweetData }) {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <div className="bg-white dark:bg-black min-h-screen dark:text-white text-black  max-w-[1400px] mx-auto flex">
        <SideBar />
        <div
          className="sm:ml-16 xl:ml-[350px] max-w-2xl flex-grow
           border-gray-200 dark:border-gray-700 border-x"
        >
          <div
            className="px-3 py-2 text-lg sm:text-xl font-bold
         border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 flex space-x-2"
          >
            <Link href="/">
              <ArrowLeftIcon className="w-7 cursor-pointer" />
            </Link>
            <h1>Tweet</h1>
          </div>

          <div className="dark:border-b border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-3 p-3  border-gray-700">
              <img
                src={tweetData.photoUrl}
                className="rounded-full w-11 h-11 object-cover"
              />

              <div>
                <div className="flex text-gray-500 items-center space-x-2 mb-1">
                  <h1 className="font-bold text-black dark:text-white">
                    {tweetData.name}
                  </h1>
                  <span>@{tweetData.username}</span>
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  <Moment fromNow>{JSON.parse(tweetData.timestamp)}</Moment>
                </div>
                <span className="text-xl">{tweetData.text}</span>

                {tweetData.image && (
                  <img
                    className="object-cover rounded-md mt-3 max-h-80 border border-gray-700"
                    src={tweetData.image}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center  border-b border-gray-200 dark:border-gray-700 p-2">
            <div className="flex justify-center p-1 space-x-2 items-center ">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={user.photoUrl}
              />
              <h1 className="text-2xl text-gray-500 ">Tweet your reply</h1>
            </div>

            <button
              className="bg-[#F4AF01] text-black dark:text-white rounded-full px-4 py-1.5
          disabled:opacity-50"
              disabled={true}
            >
              Bumble
            </button>
          </div>

          {tweetData.comments?.map((comment) => (
            <div className=" border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-3 p-3  border-gray-700">
                <img
                  src={comment.photoUrl}
                  className="rounded-full w-11 h-11 object-cover"
                />

                <div>
                  <div className="flex text-gray-500 items-center space-x-2 mb-1">
                    <h1 className="text-black dark:text-white font-bold">
                      {comment.name}
                    </h1>
                    <span>@{comment.username}</span>
                  </div>
                  <span>{comment.comment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Trending />
      </div>
    </div>
  );
}
