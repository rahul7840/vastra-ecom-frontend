"use client";
import React from "react";
import image from "@/public/auth/authImg.svg";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Page = () => {
  const targetDate = new Date("2024-12-31T23:59:59").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Left side - Image */}
      <div className="hidden md:block relative w-full md:w-1/2 h-auto">
        <Image
          src={image}
          alt="img"
          className="w-full h-auto object-cover"
          style={{ maxHeight: "100vh" }}
        />
        <p className="text-2xl text-gray-900 absolute top-8 left-8 font-medium">
          VASTRA
        </p>
      </div>

      {/* Right side - Countdown */}
      <div className="relative w-full md:w-1/2 bg-gray-100 h-screen md:h-auto p-8 flex flex-col justify-center">
        <div className="absolute top-8 right-8">
          <Link href="/" className="text-blue-500 text-base font-medium">
            Home
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-4xl mb-10">Coming Soon</h2>

          {/* Countdown Timer */}
          <div className="flex gap-10 text-center">
            <div>
              <span className="block text-5xl font-bold">{timeLeft.days}</span>
              <span className="block font-medium">Days</span>
            </div>
            <div>
              <span className="block text-5xl font-bold">{timeLeft.hours}</span>
              <span className="block font-medium">Hours</span>
            </div>
            <div>
              <span className="block text-5xl font-bold">{timeLeft.minutes}</span>
              <span className="block font-medium">Minutes</span>
            </div>
            <div>
              <span className="block text-5xl font-bold">{timeLeft.seconds}</span>
              <span className="block font-medium">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
