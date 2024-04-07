import { useSelector } from "react-redux";
import LoginModal from "./modals/LoginModal";
import SignupModal from "./modals/SignupModal";
import { RootState } from "@/redux/store";

export default function BottomBanner() {
  const user = useSelector((state: RootState) => state.user.username);

  if (user) {
    return null;
  } else {
    return (
      <div className="xl:space-x-[400px] text-black dark:text-white fixed justify-center items-center w-full h-[80px] bg-[#1d9bf0 bg-[#F4AF01] bottom-0 flex">
        <div className="hidden xl:inline  ">
          <h1 className="text-2xl font-bold ">Dont miss out on the buzz</h1>
          <span className="text-[18px] font-normal">
            People on Busy Bee are always the first to know.
          </span>
        </div>
        <div className="space-x-3">
          <LoginModal />
          <SignupModal />
        </div>
      </div>
    );
  }
}
