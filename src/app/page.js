"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/detail-invite");
  };

  return (
    <div
      className="relative h-screen w-screen bg-center bg-cover"
      style={{ backgroundImage: "url('/assets/images/1.jpg')" }}
    >
      <button
        onClick={handleClick}
        className="block z-[4] w-auto border border-white bg-black/15 leading-[50px] px-[10px] min-w-[230px] m-0 text-[14px] uppercase text-center rounded-full cursor-pointer text-white box-border absolute left-1/2 -translate-x-1/2 bottom-[150px]"
      >
        Tap to start
      </button>
    </div>
  );
}
