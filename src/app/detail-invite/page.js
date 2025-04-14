"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "framer-motion";

const videoBackgrounds = [
  "/assets/images/bg.mp4",
];

const imageList = [
  { src: "1.png" },
  { src: "2.png", link: "https://maps.app.goo.gl/uEj21xNA1c3Ug9gU8" },
  { src: "3.png" },
  { src: "4.png" },
  { src: "5.png" },
];

export default function DetailInvite() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const totalImages = imageList.length;
  const audioRef = useRef(null);
  const refs = useRef(imageList.map(() => React.createRef()));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videoBackgrounds.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (audioRef.current.muted) {
        audioRef.current.muted = false;
        audioRef.current.play();
      } else {
        audioRef.current.muted = true;
        audioRef.current.pause();
      }
    }
    setIsMuted((prev) => !prev);
  };

  const allImagesLoaded = true;

  return (
    <>
      <audio
        ref={audioRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="hidden"
      >
        <source src="/sounds/song.mp3" type="audio/mpeg" />
      </audio>

      {!allImagesLoaded && (
        <div className="fixed inset-0 bg-black flex items-center justify-center text-white text-xl z-[100]">
          جاري التحميل...
        </div>
      )}

      {allImagesLoaded && (
        <>
          {/* فيديو الخلفية */}
          <video
            key={currentIndex}
            src={videoBackgrounds[currentIndex]}
            autoPlay
            loop
            muted
            playsInline
            className="fixed inset-0 w-full h-full object-cover -z-10 transition-opacity duration-1000"
          />

          <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
            <div className="flex flex-col h-full">
              {imageList.map(({ src, link }, idx) => {
                const ref = refs.current[idx];
                const isInView = useInView(ref, { once: true });

                const image = (
                  <motion.div
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={`/assets/images/${src}`}
                      alt={`img-${idx + 1}`}
                      fill
                      className="object-contain z-10"
                      priority={idx < 3}
                      loading={idx < 3 ? "eager" : "lazy"}
                      onLoad={() => setImagesLoaded((prev) => prev + 1)}
                    />
                  </motion.div>
                );

                return (
                  <div
                    key={idx}
                    className="relative h-screen w-screen flex-shrink-0 snap-start overflow-hidden"
                  >
                    {link ? (
                      <Link
                        href={link}
                        target="_blank"
                        rel="opener"
                        className="block w-full h-full"
                      >
                        {image}
                      </Link>
                    ) : (
                      image
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div
            onClick={toggleMute}
            className="fixed bottom-10 left-8 cursor-pointer z-20"
          >
            <Image
              src={
                isMuted
                  ? "/assets/icons/mute-music.svg"
                  : "/assets/icons/unmute-music.svg"
              }
              alt="mute-icon"
              width={24}
              height={24}
            />
          </div>

          <span className="fixed bottom-10 left-1/2 transform -translate-x-1/2 text-white text-sm flex flex-col items-center animate-bounce z-10">
            <span>Swipe up</span>
            <Image
              src="/assets/icons/arrow-up.svg"
              alt="arrow-up"
              width={24}
              height={24}
              className="mt-1"
            />
          </span>
        </>
      )}
    </>
  );
}
