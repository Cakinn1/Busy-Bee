import React, { useState } from "react";

import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { XIcon } from "@heroicons/react/outline";
export default function LoginModal() {
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSignIn() {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function handleGuestSignIn() {
    await signInWithEmailAndPassword(auth, "guest12345@gmail.com", "123456");
  }

  return (
    <>
      <button
        className="bg-transparent border border-white dark:bg-white  font-bold text-white   dark:text-black w-[160px] 
        rounded-full h-[40px] duration-300 hover:bg-white hover:text-black "
        onClick={() => dispatch(openLoginModal())}
      >
        Login
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="flex justify-center items-center"
      >
        <div className="w-[90%]   bg-white dark:bg-black text-black dark:text-white md:w-[560px]  h-[500px md:h-[500px border border-gray-700 rounded-lg flex justify-center">
          <div className="w-[90%] p-12 mt-8 relative flex flex-col">
            <XIcon onClick={() => dispatch(closeLoginModal())} className="h-6 cursor-pointer hover:scale-125 duration-150 active:scale-90  absolute left-0 top-0" />
            <h1 className=" mt-4 font-bold text-[30px]">Log in to Busy Bee</h1>

            <input
              className="h-10 mt-8 rounded-md bg-transparent border border-gray-700 p-6"
              placeholder="Email"
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="h-10 mt-8 rounded-md bg-transparent border border-gray-700 p-6"
              placeholder="Password"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />

            <HandleButton onClick={handleSignIn} text={"Sign In"} />
            <h1 className="text-center  font-bold text-lg mt-4"> or</h1>
            <HandleButton
              onClick={handleGuestSignIn}
              text={"Sign In as Guest"}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

function HandleButton({ onClick, text }) {
  return (
    <button
      className="bg-[#F4AF01] text-white  w-full font-bold text-lg rounded-md p-2 mt-4"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
