import { db } from "@/lib/firebase";
import { closeCommentModal } from "@/redux/modalSlice";
import { RootState } from "@/redux/store";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import Modal from "@mui/material/Modal";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CommentModal() {
  const isOpen = useSelector(
    (state: RootState) => state.modals.commentModalOpen
  );
  const userImg = useSelector((state: RootState) => state.user.photoUrl);
  const tweetDetails = useSelector((state: RootState) => state.comment);
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [comment, setComment] = useState<string>("");

  async function sendComment() {
    if (!tweetDetails.id) {
      return;
    }
    const docRef = doc(db, "posts", tweetDetails.id);
    const commentDetails = {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      comment: comment,
    };
    await updateDoc(docRef, {
      comments: arrayUnion(commentDetails),
    });

    dispatch(closeCommentModal());
    router.push("/" + tweetDetails.id);
  }

  return (
    <>
      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => dispatch(closeCommentModal())}
      >
        <div
          className="w-full h-full dark:bg-black bg-white border
           border-gray-500 rounded-lg sm:w-[600px] sm:h-[386px] text-white 
        sm:p-10 p-4 relative"
        >
          <div
            className="absolute w-[2px] h-[77px] bg-gray-500 
            left-[40px] top-[96px] sm:left-[64px] sm:top-[120px]"
          ></div>
          <div
            className="absolute top-4"
            onClick={() => dispatch(closeCommentModal())}
          >
            <XIcon className="w-6 text-black dark:text-white" />
          </div>
          <div className="mt-8">
            <div className="flex space-x-3">
              <img
                alt="user icon"
                className="rounded-full h-12 w-12 object-cover"
                src={tweetDetails.photoUrl ? tweetDetails?.photoUrl : ""}
              />
              <div>
                <div className="flex space-x-1.5">
                  <h1 className="font-bold text-black dark:text-white">
                    {tweetDetails.name}
                  </h1>
                  <h1 className="text-gray-500">@{tweetDetails.username}</h1>
                </div>
                <p className="mt-1 text-black dark:text-white">
                  {tweetDetails.tweet}
                </p>
                <h1 className="text-gray-500 text-[15px] mt-2">
                  Replying to{" "}
                  <span className="text-[#F4AF01]">
                    @{tweetDetails.username}
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <div className="mt-11">
            <div className="flex space-x-3">
              <img
                alt="user icon"
                className="rounded-full h-12 w-12 object-cover"
                src={userImg ? userImg : ""}
              />
              <div className="w-full">
                <textarea
                  className="w-full
                  text-black dark:text-white
                  bg-transparent resize-none text-lg focus:outline-none"
                  placeholder="Bumble your reply"
                  onChange={(e) => setComment(e.target.value)}
                />

                <div className="flex justify-between border-t border-gray-700 pt-4">
                  <div className="flex space-x-0">
                    <Icons Icon={PhotographIcon} />
                    <Icons Icon={ChartBarIcon} />
                    <Icons Icon={EmojiHappyIcon} />
                    <Icons Icon={CalendarIcon} />
                    <Icons Icon={LocationMarkerIcon} />
                  </div>
                  <button
                    className="bg-[#F4AF01] text-black dark:text-white rounded-full px-4 py-1.5 disabled:opacity-50"
                    disabled={!comment}
                    onClick={sendComment}
                  >
                    Bumble
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

function Icons({ Icon }: any) {
  return (
    <div className="iconAnimation">
      <Icon className="h-[22px] text-[#F4AF01]" />
    </div>
  );
}
