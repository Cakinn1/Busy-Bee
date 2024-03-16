import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

export default function Loading() {
    const [timeoutComplete, setTimeoutComplex] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setTimeoutComplex(true)
        }, 1000);
    }, [])
  return (
    <section className={`${timeoutComplete && "animate__fade--out "} absolute w-full z-50 bg-white flex flex-col justify-center items-center min-h-screen`}>
      <figure className="mb-4">
        <Image
          src="/assets/busybee-logo2.webp"
          loading="lazy"
          alt="Busy Bee image"
          width="128"
          height="128"
        />
      </figure>
      <h1 className="font-bold text-6xl mb-10">
        Busy <span className="text-[#f4afa1]">Bee</span>
      </h1>
      <div className="w-[265px] bg-[#F4AFA1] overflow-hidden h-3">
        <ProgressBar
          customLabelStyles={{ fontSize: 0 }}
          completed={100}
          baseBgColor="#F4AFA1 "
          transitionDuration="1.5s"
          borderRadius="0"
          animateOnRender={true}
          bgColor="black"
        />
      </div>
    </section>
  );
}
