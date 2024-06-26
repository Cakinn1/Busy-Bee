import { RootState } from "@/redux/store";
import { toggleTheme } from "@/redux/themeSlice";
import { LightBulbIcon, MoonIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  sideBarLink?: boolean;
}
export default function SideBarThemeToggle({ sideBarLink }: Props) {
  const darkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <>
      {sideBarLink ? (
        <li
          onClick={() => handleToggle()}
          className="hoverAnimation flex mb-3 xl:justify-start justify-center items-center text-xl space-x-3"
        >
          {darkMode ? (
            <>
              <MoonIcon className="h-7 text-black dark:text-white" />
              <span className="hidden xl:inline text-black dark:text-white">
                Light Mode
              </span>
            </>
          ) : (
            <>
              <LightBulbIcon className="h-7 text-black dark:text-white" />
              <span className="hidden xl:inline text-black dark:text-white">
                Dark Mode
              </span>
            </>
          )}
        </li>
      ) : (
        <div onClick={handleToggle} className="iconAnimation">
          {darkMode ? (
            <MoonIcon className="h-[22px]  text-[#F4AF01]" />
          ) : (
            <LightBulbIcon className="h-[22px]  text-[#F4AF01]" />
          )}
        </div>
      )}
    </>
  );
}
