import React from "react";

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute flex right-0 top-0 -mt-36 mr-12"></div>
      <div className="md:flex w-max mx-auto my-24">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
          alt="home"
          className="w-24 md:w-60 h-max"
        />
        <h1 className="text-white font-pop md:text-4xl font-bold my-24 md:mx-12">
          Feel Like Boring ? Do Quick Chat
          <p className="md:text-2xl my-2 font-nun text-yellow-300">
            {" "}
            Try Our Quick Chat{" "}
          </p>
        </h1>
      </div>
      <div className="md:flex my-[14px] mx-auto w-max">
        <h1 className="text-white font-pop md:text-4xl font-bold my-24 md:mx-12">
          Find Out Your Best Friend
          <p className="md:text-2xl my-2 font-nun text-yellow-300">
            {" "}
            Quick Friend On the go{" "}
          </p>
        </h1>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3220/3220772.png"
          alt="frnd"
          className="w-24 lg:w-80 h-max"
        />
      </div>
    </div>
  );
}
