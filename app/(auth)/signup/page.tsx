import React from "react";
import Image from "next/image";
import G_icon from "@/public/auth/G-icon.svg";
import logo from "@/public/auth/logo.svg";
import authImg from "@/public/auth/authImg.svg";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center h-screen lg:h-full">
      <div className="h-2/5 lg:h-full w-full lg:order-2">
        <Image
          src={authImg}
          alt="authImg"
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="relative h-3/5 lg:h-full w-full p-5 flex flex-col items-center justify-center ">
        <Image
          src={logo}
          alt="authImg"
          width={75}
          height={100}
          className="absolute top-5 left-5 hidden lg:block"
        />
        <form className="mt-10 flex flex-col gap-2 w-full max-w-sm lg:max-w-md">
          <div>
            <h2 className="text-2xl font-bold">Create an Account</h2>
            <p className="mt-1 text-lg font-semibold">
              Join us by creating an Account
            </p>
          </div>
          <div className="flex flex-col gap-2 my-1 text-sm">
            <div>
              <label htmlFor="FullName" className="font-semibold">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  placeholder="Enter your Fullname"
                  className="border border-colors-grayBorder w-full p-2"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="border border-colors-grayBorder w-full p-2"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="font-semibold">
                Phone No
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  placeholder="Enter your Phone no"
                  className="border border-colors-grayBorder w-full p-2"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  placeholder="Enter your password"
                  className="border border-colors-grayBorder w-full p-2"
                />
                <p className="absolute top-3 right-2 text-xs font-medium text-colors-grayFont">
                  Show
                </p>
              </div>
            </div>
            <div className="flex gap-5 w-full">
              <div className="w-1/2">
                <label htmlFor="gender" className="font-semibold">
                  Gender
                </label>
                <div className="mt-1">
                  <select
                    id="gender"
                    name="gender"
                    className="border border-colors-grayBorder text-colors-grayFont w-full p-2 rounded-none"
                    defaultValue=""
                  >
                    <option
                      value=""
                      disabled
                      className="text-colors-darkGrayFont bg-white"
                    >
                      Select gender
                    </option>
                    <option value="male" className="text-colors-darkGrayFont">
                      Male
                    </option>
                    <option value="female" className="text-colors-darkGrayFont">
                      Female
                    </option>
                  </select>
                </div>
              </div>
              <div className="w-1/2">
                <label htmlFor="birthdate" className="font-semibold">
                  Birth Date
                </label>
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  className="border border-colors-grayBorder text-colors-grayFont w-full p-2 mt-1"
                />
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex items-center justify-center bg-colors-themeColor font-semibold text-white w-full p-2 hover:underline"
            >
              Sign Up
            </button>
          </div>
          <div>
            <button className="flex gap-2 items-center justify-center border border-colors-grayBorder w-full p-2 hover:underline">
              <span>
                <Image src={G_icon} alt="Icon" width={20} height={100} />
              </span>
              Continue with Google
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link href="login" className="font-semibold hover:underline">
                Sign-in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
