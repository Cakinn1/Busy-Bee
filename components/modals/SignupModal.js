import React, { useEffect, useState } from "react";

import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeSignupModal, openSignupModal } from "@/redux/modalSlice";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase";
import { current } from "@reduxjs/toolkit";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/router";

export default function SignupModal() {
  const isOpen = useSelector((state) => state.modals.signupModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleSignUp() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: `./assets/profilePictures/pfp${Math.ceil(
        Math.random() * 6
      )}.png`,
    });

    router.reload();
  }
  async function handleGuestSignIn() {
    await signInWithEmailAndPassword(auth, "guest12345@gmail.com", "123456");
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      console.log(currentUser);
      dispatch(
        setUser({
          username: currentUser.email.split("@")[0],
          name: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
          photoUrl: currentUser.photoURL,
        })
      );
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <button
        className="bg-white font-bold  text-black dark:text-white dark:bg-transparent dark:border-white dark:border w-[160px] 
        rounded-full h-[40px] duration-300 dark:hover:bg-white dark:hover:text-black dark:hover:border-black"
        onClick={() => dispatch(openSignupModal())}
      >
        Sign Up
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignupModal())}
        className="flex justify-center items-center"
      >
        <div className="w-[90%] h-[600px] bg-black text-white md:w-[560px] md:h-[600px] border border-gray-700 rounded-lg flex justify-center">
          <div className="w-[90%] mt-8 flex flex-col">
            <button
              className="bg-white text-black w-full font-bold text-lg rounded-md p-2"
              onClick={handleGuestSignIn}
            >
              Sign In as Guest
            </button>
            <h1 className="text-center mt-4 font-bold text-lg"> or</h1>
            <h1 className=" mt-4 font-bold text-4xl"> Create your Account</h1>
            <input
              className="h-10 mt-8 rounded-md bg-transparent border border-gray-700 p-6"
              placeholder="Full Name"
              type={"text"}
              onChange={(e) => setName(e.target.value)}
            />
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
              onClick={handleSignUp}
            >
              Create account
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
