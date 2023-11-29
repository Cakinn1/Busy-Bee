import { db, storage } from "@/firebase";
import { openLoginModal } from "@/redux/modalSlice";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LightBulbIcon,
  LocationMarkerIcon,
  MoonIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBarThemeToggle from "./SideBarThemeToggle";

export default function TweetInput() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const filerPickerRef = useRef(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  async function sendTweet() {
    if (!user.username) {
      dispatch(openLoginModal());
      return;
    }

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      uid: user.uid,
      timestamp: serverTimestamp(),
      likes: [],
      tweet: text,
    });

    if (image) {
      const imageRef = ref(storage, `tweetImages/${docRef.id}`);
      const uploadImage = await uploadString(imageRef, image, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadURL,
      });
    }

    setText("");
    setImage(null);
    setLoading(false);
  }

  function addImageToTweet(e) {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.addEventListener("load", (e) => {
      setImage(e.target.result);
    });
  }

  return (
    <div className="flex space-x-3 p-3 border-b border-gray-200 text-black dark:border-gray-700">
      <img
        src={user.photoUrl || "/assets/pfp.webp"}
        className="rounded-full w-11 h-11 object-cover"
      />

      {loading && <h1 className="text-2xl text-gray-500">Uploading post...</h1>}
      {!loading && (
        <div className="w-full">
          <textarea
            className="bg-transparent dark:text-white resize-none outline-none w-full min-h-[50px] text-lg"
            placeholder="What's on your mind?"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />

          {image && (
            <div className="relative mb-4">
              <div
                className="absolute top-1 left-1 
            bg-[#272c26] rounded-full w-8 h-8 flex justify-center
            items-center cursor-pointer hover:bg-white hover:bg-opacity-10"
                onClick={() => setImage(null)}
              >
                <XIcon className="h-5" />
              </div>

              <img
                className="rounded-2xl max-h-80 object-contain"
                src={image}
                alt=""
              />
            </div>
          )}

          <div className="flex justify-between dark:border-t border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex space-x-0">
              <div
                className={`iconAnimation`}
                onClick={() => filerPickerRef.current.click()}
              >
                <Icon Icons={PhotographIcon} />
              </div>
              <input
                className="hidden"
                type="file"
                ref={filerPickerRef}
                onChange={addImageToTweet}
              />
              <Icon Icons={ChartBarIcon} />
              <Icon Icons={EmojiHappyIcon} />
              <Icon Icons={CalendarIcon} />
              <Icon Icons={LocationMarkerIcon} />
              <SideBarThemeToggle />
            </div>
            <button
              className="bg-[#F4AF01] text-black  dark:text-white rounded-full px-4 py-1.5
              disabled:opacity-50"
              // uid not loading when on this button in db
              onClick={sendTweet}
              disabled={!text && !image}
            >
              Bumble
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
function Icon({ Icons }) {
  return (
    <div className="iconAnimation">
      <Icons
        className={`h-[22px]  text-[#F4AF01] ${
          Icons === PhotographIcon ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      />
    </div>
  );
}
