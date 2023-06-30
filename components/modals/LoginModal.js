import React, { useState } from "react";

import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
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
        className="bg-transparent border border-white text-white w-[160px] 
        rounded-full h-[40px] hover:bg-[#cbd2d7]"
        onClick={() => dispatch(openLoginModal())}
      >
        Login
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="flex justify-center items-center"
      >
        <div className="w-[90%] h-[600px] bg-black text-white md:w-[560px] md:h-[600px] border border-gray-700 rounded-lg flex justify-center">
          <div className="w-[90%] mt-8 flex flex-col">
            <h1 className=" mt-4 font-bold text-4xl">
              Sign in to your account
            </h1>

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

            <button
              className="bg-white text-black w-full rounded-md font-bold text-lg mt-8 p-2"
              onClick={handleSignIn}
            >
              Sign in
            </button>
            <h1 className="text-center  font-bold text-lg mt-8"> or</h1>
            <button
              className="bg-white text-black w-full font-bold text-lg rounded-md p-2 mt-4"
              onClick={handleGuestSignIn}
            >
              Sign In as Guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
