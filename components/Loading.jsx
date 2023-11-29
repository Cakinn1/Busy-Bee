import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 1);
  console.log(progress);

    }, 5000); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, [progress]);
  console.log(progress);
  return (
    <section className="bg-white flex flex-col justify-center items-center min-h-screen ">
      <figure className="mb-4">
        <Image
          src="/assets/busybee-logo2.webp"
          loading="lazy"
          alt="Busy Bee image :)"
          width="128"
          height="128"
        />
      </figure>
      <div className="w-[265px] bg-[#F4AFA1] overflow-hidden h-4">
        <div
          className={`bg-black w-[${progress}px] h-4`}
          style={{
            transition: "width 1s",
          }}
        ></div>
      </div>
    </section>
  );
}
