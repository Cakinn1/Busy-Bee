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
import { auth, db } from "@/lib/firebase";
import { current } from "@reduxjs/toolkit";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/router";
import { EyeIcon, EyeOffIcon, XIcon } from "@heroicons/react/outline";
import { addDoc, collection } from "firebase/firestore";
import { RootState } from "@/redux/store";

export default function SignupModal() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const isOpen = useSelector(
    (state: RootState) => state.modals.signupModalOpen
  );
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleSignUp() {
    try {
      if (!auth.currentUser) {
        return console.log("Current user does not exist");
      }
      //
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: `./assets/profilePictures/pfp${Math.ceil(
          Math.random() * 6
        )}.png`,
      });
      router.reload();
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  }
  async function handleGuestSignIn() {
    try {
      await signInWithEmailAndPassword(auth, "guest12345@gmail.com", "123456");
    } catch (error) {
      console.error("Error signin in as guest", error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) return;
      await addDoc(collection(db, "users"), {
        username: currentUser.email!.split("@")[0],
        name: currentUser.displayName,
        email: currentUser.email,
        uid: currentUser.uid,
        photoUrl: currentUser.photoURL,
        badge: "",
      });
      dispatch(
        setUser({
          username: currentUser.email!.split("@")[0],
          name: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
          photoUrl: currentUser.photoURL,
        })
      );
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setType("password");
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
        <div className="w-[90%] bg-white dark:bg-black text-black dark:text-white md:w-[560px]  h-[500px md:h-[500px border border-gray-700 rounded-lg flex justify-center">
          <div className="w-[90%] p-12 mt-8 relative flex flex-col">
            <XIcon
              onClick={() => dispatch(closeSignupModal())}
              className="h-6 cursor-pointer hover:scale-125 duration-150 active:scale-90  absolute left-0 top-0"
            />
            <HandleButton
              onClick={handleGuestSignIn}
              text={"Sign In As Guest"}
            />
            <h1 className="text-center mt-4 font-bold text-lg"> or</h1>
            <h1 className=" mt-4 font-bold text-4xl"> Create your Account</h1>
            <HandleInput
              setType={setType}
              onClick={setName}
              type={"text"}
              placeholder={"Full Name"}
            />
            <HandleInput
              setType={setType}
              onClick={setEmail}
              type={"email"}
              placeholder={"Email"}
            />
            <div className="relative">
              <HandleInput
                onClick={setPassword}
                type={type}
                placeholder={"Password"}
                setType={setType}
              />
            </div>
            {error && (
              <div className="p-2 text-red-500 text-sm tracking-wider">
                Error, Enter information correctly.
              </div>
            )}
            <HandleButton onClick={handleSignUp} text={"Create Account"} />
          </div>
        </div>
      </Modal>
    </>
  );
}

interface HandleInputProps {
  onClick: (value: string) => void;
  placeholder: string;
  type: string;
  setType: (value: string) => void;
}

function HandleInput({
  onClick,
  placeholder,
  type,
  setType,
}: HandleInputProps) {
  return (
    <>
      <input
        className="h-10 mt-8 w-full relative rounded-md outline-none dark:border-gray-700 duration-150 focus:border-[#F4AF01] dark:focus:border-[#F4AF01] bg-transparent border border-gray-200 p-6"
        placeholder={placeholder}
        type={type}
        onChange={(e) => onClick(e.target.value)}
      />
      {placeholder === "Password" &&
        (type === "password" ? (
          <EyeIcon
            onClick={() => {
              return type === "password"
                ? setType("text")
                : setType("password");
            }}
            className="h-6 absolute  right-4 top-11 text-gray-500"
          />
        ) : (
          <EyeOffIcon
            onClick={() => {
              return type === "password"
                ? setType("text")
                : setType("password");
            }}
            className="h-6 absolute  right-4 top-11 text-gray-500"
          />
        ))}
    </>
  );
}

interface HandleButtonProps {
  onClick: () => void;
  text: string;
}

function HandleButton({ onClick, text }: HandleButtonProps) {
  return (
    <button
      className="bg-[#F4AF01] mt-[32px] text-white  w-full font-bold text-lg rounded-md p-2"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
