import SideBar from "@/components/SideBar";
import Trending from "@/components/Trending";
import Tweet from "@/components/Tweet";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/outline";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

import Moment from "react-moment";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { openLoginModal } from "@/redux/modalSlice";

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
    id: id,
  };
  return {
    props: {
      tweetData: formattedData,
    },
  };
}
export default function CommentsPage({ tweetData }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [comment, setComment] = useState("");

  async function sendComment() {
    const docRef = doc(db, "posts", tweetData.id);
    const commentDetails = {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      comment: comment,
    };
    await updateDoc(docRef, {
      comments: arrayUnion(commentDetails),
    });
    router.push("/" + tweetData.id);
    setComment("");
  }

  async function deleteComment(currentComment) {
    const docRef = doc(db, "posts", tweetData.id);
    const updatedComments = tweetData.comments.filter((comment) => {
      return comment.comment !== currentComment;
    });
    await updateDoc(docRef, {
      comments: updatedComments,
    });
    router.push("/" + tweetData.id);
  }

  function userSignedOut() {
    router.push("/");
    const modalTimer = setTimeout(() => {
      dispatch(openLoginModal());
    }, 2000);
    return () => clearTimeout(modalTimer);
  }

  useEffect(() => {
    if (!user.username) {
      userSignedOut();
    }
  }, [user]);

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
            <h1>Bumble</h1>
          </div>

          <div className="dark:border-b border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-3 p-3  border-gray-700">
              <img
                alt="user icon"
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
                    alt="user icon"
                    className="object-cover rounded-md mt-3 max-h-80 border border-gray-700"
                    src={tweetData.image}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-x-2 items-center  border-b border-gray-200 dark:border-gray-700 p-2">
            <div className="flex  gap-x-2 justify-center flex-1 p-1 space-x-2 items-center ">
              <img
                alt="user icon"
                className="h-12 w-12 rounded-full object-cover"
                src={user.photoUrl}
              />
              <textarea
                wrap="soft"
                placeholder="Tweet your reply"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                className="w-full break-words dark:bg-black t dark:text-white focus:outline-none  text-black resize-none"
              />
            </div>

            <button
              onClick={sendComment}
              className="bg-[#F4AF01]  hover:brightness-110 duration-300 text-black dark:text-white rounded-full px-4 py-1.5
          disabled:opacity-50"
            >
              Bumble
            </button>
          </div>
          {tweetData.comments?.map((comment) => (
            <TweetComment comment={comment} deleteComment={deleteComment} />
          ))}
        </div>
        <Trending />
      </div>
    </div>
  );
}

function TweetComment({ comment, deleteComment }) {
  const user = useSelector((state) => state.user);
  return (
    <div className=" border-b  border-gray-200 dark:border-gray-700">
      <div className="flex space-x-3 p-3 flex-1 relative border-gray-700">
        <img
          alt="user icon"
          src={comment.photoUrl}
          className="rounded-full w-11 h-11 object-cover"
        />
        <div className="truncate">
          <div className="flex text-gray-500 items-center space-x-2 mb-1">
            <h1 className="text-black dark:text-white font-bold">
              {comment.name}
            </h1>
            <span>@{comment.username}</span>
          </div>
          <span className="break-words">{comment.comment}</span>
        </div>

        {user.username === comment.username && (
          <div>
            <TrashIcon
              onClick={() => deleteComment(comment.comment)}
              className="w-5 cursor-pointer absolute duration-200 right-4 hover:text-red-600"
            />
          </div>
        )}
      </div>
    </div>
  );
}
