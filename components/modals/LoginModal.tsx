import React, { useContext, useEffect, useState } from "react";

import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { EyeIcon, EyeOffIcon, XIcon } from "@heroicons/react/outline";
import { RootState } from "@/redux/store";
import { progressContext } from "@/context/ProgressContext";
export default function LoginModal() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [type, setType] = useState<string>("");
  const isOpen = useSelector((state: RootState) => state.modals.loginModalOpen);
  const dispatch = useDispatch();
  const { setProgress } = useContext(progressContext);

  async function handleSignIn() {
    try {
      setProgress(10);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error, "error signing in");
      setProgress(0);
    } finally {
      setProgress(100);
    }
  }

  async function handleGuestSignIn() {
    try {
      setProgress(10);
      await signInWithEmailAndPassword(auth, "guest12345@gmail.com", "123456");
    } catch (error) {
      console.error(error, "error signing into guest account");
    } finally {
      setProgress(100);
    }
  }

  useEffect(() => {
    setType("password");
  }, []);

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
        <div className="w-[90%] bg-white dark:bg-black text-black dark:text-white md:w-[560px]  h-[500px md:h-[500px border border-gray-700 rounded-lg flex justify-center">
          <div className="w-[90%] p-12 mt-8 relative flex flex-col">
            <XIcon
              onClick={() => dispatch(closeLoginModal())}
              className="h-6 cursor-pointer hover:scale-125 duration-150 active:scale-90  absolute left-0 top-0"
            />
            <h1 className="mt-4 font-bold text-[30px]">Log in to Busy Bee</h1>
            <HandleInput
              onClick={setEmail}
              type={"email"}
              placeholder={"Email"}
              setType={setType}
            />
            <div className="relative">
              <HandleInput
                onClick={setPassword}
                type={type}
                placeholder={"Password"}
                setType={setType}
              />
            </div>
            <HandleButton onClick={handleSignIn} text={"Sign In"} />
            <h1 className="text-center font-bold text-lg mt-4"> or</h1>
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
      className="bg-[#F4AF01] text-white  w-full font-bold text-lg rounded-md p-2 mt-4"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
