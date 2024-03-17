import payments, { loadCheckout } from "@/lib/stripe";
import { closeStripModal } from "@/redux/modalSlice";
import { Modal } from "@mui/material";
import { getProducts } from "@stripe/firestore-stripe-payments";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { XIcon } from "@heroicons/react/outline";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { RiLoader2Fill } from "react-icons/ri";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
export default function StripeModal() {
  const isOpen = useSelector((state) => state.modals.stripeModeOpen);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isBilingLoading, setIsBilingLoading] = useState(false);

  async function getStripeProducts() {
    try {
      const products = await getProducts(payments, {
        includePrices: true,
        activeOnly: true,
      });
      setProduct(products);
      setSelectedPlan(products[2]);
    } catch (error) {
      console.error("error", error.message);
    }
  }

  function subscribeToPlan() {
    loadCheckout(selectedPlan?.prices[0].id);
    setIsBilingLoading(true);
    handleUserBadge();
  }

  async function handleUserBadge() {
    const userRef = collection(db, "users");
    const postRef = collection(db, "posts");
    const q = query(userRef, where("uid", "==", user.uid));
    const postQ = query(postRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const queryPostSnapshop = await getDocs(postQ);

    for (let i = 0; i < querySnapshot.docs.length; ++i) {
      const userId = querySnapshot.docs[i];
      await updateDoc(doc(db, "users", userId.id), {
        badge: selectedPlan.name,
      });
    }

    for (let i = 0; i < queryPostSnapshop.docs.length; ++i) {
      const postDoc = queryPostSnapshop.docs[i];
      await updateDoc(doc(db, "posts", postDoc.id), {
        badge: selectedPlan.name,
      });
    }
  }

  useEffect(() => {
    getStripeProducts();
  }, []);

  return (
    <Modal
      onClick={() => dispatch(closeStripModal())}
      open={isOpen}
      className="flex justify-center items-center"
    >
      <div
        className="bg-white flex flex-col relative  w-[600px] p-6 h-[600px] rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleUserBadge}>done</button>
        <XIcon
          onClick={() => dispatch(closeStripModal())}
          className="h-7 duration-300 cursor-pointer active:scale-90 hover:scale-125 absolute w-7"
        />
        <div className="space-y-4 flex overflow-y-scroll h-[400px] flex-1 flex-col mx-16">
          <h1 className="font-semibold text-lg">Subscribe</h1>
          <Plan
            text={"Premium+"}
            setSelectedPlan={setSelectedPlan}
            selectedPlan={selectedPlan}
            value={product[2]}
          />
          <Plan
            text={"Premium"}
            setSelectedPlan={setSelectedPlan}
            selectedPlan={selectedPlan}
            value={product[1]}
          />
          <Plan
            text={"Basic"}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            value={product[0]}
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            className={`bg-black text-white p-2 rounded-md px-14`}
            onClick={subscribeToPlan}
            disabled={isBilingLoading}
          >
            {isBilingLoading ? (
              <RiLoader2Fill className="h-6 w-6 animate-spin" />
            ) : (
              <span>Subscribe</span>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Plan({ value, text, setSelectedPlan, selectedPlan }) {
  const isSelected = text === selectedPlan?.name;
  return (
    <>
      <div
        onClick={() => setSelectedPlan(value)}
        className={`${
          !isSelected && "bg-opacity-30"
        }  text-white cursor-pointer rounded-md  duration-300 bg-black w-full p-4 flex justify-between/ justify-center items-center`}
      >
        {/* <FaArrowLeft /> */}
        <h1>{text}</h1>
        {/* <FaArrowRight /> */}
      </div>
      <div className="bg-[#eff3f4] rounded-md p-4">
        <span>
          Monthly Price:{" "}
          <span className="text-[#808080]">
            ${value?.prices[0]?.unit_amount / 100}
          </span>
        </span>
      </div>
    </>
  );
}

{
  /* <button>click here</button>

<h1 onClick={getStripeProducts}>clic</h1>

{product.map((product) => (
  <div key={product.id} onClick={() => setSelectedPlan(product)}>
    {product.name}
    <h1>AUD${product?.prices[0]?.unit_amount / 100}</h1>
  </div>
))}
<button onClick={subscribeToPlan} disabled={isBilingLoading}>
  clcik
</button> */
}

{
  /* <div className="bg-[#eff3f4] rounded-md p-4">
            <h1>Enchanced Experience</h1>
          </div> */
}

// const products = [
//   {
//     plan: "Premium+",
//     title: "Enhanced Experience",
//     titles1: [
//       { title: "Grok Early Access", lock: false },
//       { title: "Ads in for You", lock: false },
//       { title: "Reply boost", lock: false },
//       { title: "Edit post", lock: false },
//       { title: "Longer Post", lock: false },
//       { title: "Undo post", lock: false },
//       { title: "Post longer videos", lock: false },
//       { title: "Top Articles", lock: false },
//       { title: "Reader", lock: false },
//       { title: "Background video playback", lock: false },
//       { title: "Download videos", lock: false },
//     ],
//   },
//   {
//     plan: "Basic",
//     title: "Enhanced Experience",
//   },
// ];
