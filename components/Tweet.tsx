import { db } from "@/lib/firebase";
import { openCommentModal, openLoginModal } from "@/redux/modalSlice";
import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  TrashIcon,
  UploadIcon,
  BadgeCheckIcon,
  BookmarkIcon,
} from "@heroicons/react/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/solid";
import {
  DocumentData,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommentTweet } from "@/redux/commentSlice";
import { RootState } from "@/redux/store";
import { CommentsProps, DataProps } from "./PostFeed";

interface TweetHeaderProps {
  username: string;
  name: string;
  timestamp: React.ReactElement;
  text: string;
  photoUrl: string;
  image: string | undefined;
  badge: string | undefined;
}

interface TweetProps {
  data: DataProps;
  id: string;
}
export default function Tweet({ data, id }: TweetProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const [likes, setLikes] = useState<string[]>([]);
  const [comments, setComments] = useState<CommentsProps[]>([]);
  const [badge, setBadge] = useState<string>("");
  const [bookmark, setBookmark] = useState<string>("");

  async function likeComment(e: React.MouseEvent) {
    e.stopPropagation();
    if (!user.username || !user.uid) {
      dispatch(openLoginModal());
      return;
    }

    if (likes.includes(user.uid)) {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayUnion(user.uid),
      });
    }
  }

  async function deleteTweet(e: React.MouseEvent) {
    e.stopPropagation();
    await deleteDoc(doc(db, "posts", id));
  }

  useEffect(() => {
    if (!id) return;
    const unsubscribe = onSnapshot(doc(db, "posts", id), (doc) => {
      setLikes(doc.data()?.likes);
      setComments(doc.data()?.comments);
      setBadge(doc.data()?.badge);
      setBookmark(doc.data()?.bookmark);
      // console.log(doc.data())
    });

    return unsubscribe;
  }, []);

  function validateUser() {
    if (!user.username) {
      dispatch(openLoginModal());
      return;
    }
    router.push("/" + id);
  }

  function sendCommment(e: React.MouseEvent) {
    e.stopPropagation();
    if (!user.username) {
      dispatch(openLoginModal());
      return;
    }
    dispatch(
      setCommentTweet({
        id: id,
        tweet: data?.tweet,
        photoUrl: data?.photoUrl,
        name: data?.name,
        username: data.username,
      })
    );
    dispatch(openCommentModal());
  }

  async function addBookmark(e: React.MouseEvent) {
    e.stopPropagation();

    if (!user.uid) {
      dispatch(openLoginModal());
      return;
    }

    console.log("bookmark", bookmark);
    console.log("user.uid:", user.uid);

    if (bookmark.includes(user.uid)) {
      await updateDoc(doc(db, "posts", id), {
        bookmark: arrayRemove(user.uid),
      });
      x;
    } else {
      await updateDoc(doc(db, "posts", id), {
        bookmark: arrayUnion(user.uid),
      });
    }
  }

  const tweetData: TweetHeaderProps = {
    username: data.username,
    name: data?.name,
    timestamp: data?.timestamp,
    text: data?.tweet,
    photoUrl: data?.photoUrl,
    image: data?.image,
    badge: badge,
  };
  return (
    <div
      onClick={validateUser}
      className="dark:border-b border-b border-gray-200 dark:border-gray-700 cursor-pointer"
    >
      <TweetHeader tweetData={tweetData} />
      <div className="p-3 ml-16 text-gray-500 flex space-x-14">
        <div
          className="flex justify-center items-center space-x-2"
          onClick={(e: React.MouseEvent) => sendCommment(e)}
        >
          <ChatIcon
            className={`w-5 cursor-pointer hover:text-green-400 ${
              comments?.length > 0 && "text-black dark:text-white"
            }`}
          />
          {comments?.length > 0 && (
            <span
              className={`${
                comments.length > 0 && "text-black dark:text-white"
              }`}
            >
              {comments.length}
            </span>
          )}
        </div>

        <div
          className="flex justify-center items-center space-x-2"
          onClick={(e: React.MouseEvent) => likeComment(e)}
        >
          {user.uid && likes.includes(user.uid) ? (
            <FilledHeartIcon className="w-5 text-pink-500" />
          ) : (
            <HeartIcon className="w-5 cursor-pointer hover:text-pink-500" />
          )}
          {likes.length > 0 && <span>{likes.length}</span>}
        </div>
        {user.uid === data?.uid && (
          <div
            className="cursor-pointer hover:text-red-600"
            onClick={(e: React.MouseEvent) => deleteTweet(e)}
          >
            <TrashIcon className="w-5" />
          </div>
        )}
        <ChartBarIcon className="w-5 cursor-not-allowed" />
        <div onClick={(e: React.MouseEvent) => addBookmark(e)}>
          <BookmarkIcon className="w-5 cursor-not-allowed" />
        </div>
        <UploadIcon className="w-5 cursor-not-allowed " />
      </div>
    </div>
  );
}

export function TweetHeader({ tweetData }: { tweetData: TweetHeaderProps }) {
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  return (
    <div className="flex space-x-3 p-3  border-gray-700">
      <img
        alt="user icon"
        src={tweetData.photoUrl}
        className="rounded-full w-11 h-11 object-cover"
      />

      <div className={`${imageLoading && "flex flex-1 flex-col"}`}>
        <div className="flex text-gray-500 items-center space-x-2 mb-1">
          <h1 className="dark:text-white text-black font-bold">
            {tweetData.name}
          </h1>
          {tweetData.badge && (
            <BadgeCheckIcon className="w-6 h-6 text-blue-500" />
          )}
          <span>@{tweetData.username}</span>
          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
          {tweetData.timestamp}
        </div>
        <span className="text-black dark:text-white">{tweetData.text}</span>
        {tweetData.image && (
          <>
            {imageLoading ? (
              <div className="rounded-md  mt-3 w-full h-60 bg-gray-300 animate-pulse"></div>
            ) : null}
            <img
              className={`object-cover rounded-md mt-3 max-h-80  ${
                !imageLoading && "border  border-gray-700"
              }`}
              src={tweetData.image}
              alt="image picture"
              onLoad={() => setImageLoading(false)}
            />
          </>
        )}
      </div>
    </div>
  );
}
