import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoPaperPlane } from "react-icons/io5";
export default function Chatpage() {
  const params = useParams();

  useEffect(() => {

  },[])

  return (
    <div>
      <div className=" lg:w-1/2 mx-auto p-4">
        <h1 className="bg-mainBg p-2 text-xl text-white flex">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3899/3899618.png"
            alt=""
            className="w-14 h-14"
          />

          <p className="mx-4 my-2"> {params.recieverid.split("@")[0]}</p>
        </h1>
        <div className="msg bg-headBg h-[32rem]"></div>
        <div className="flex my-2">
          {" "}
          <input
            type="text"
            name="msg"
            id="msg"
            className="w-full h-max bg-gray-800 p-2 rounded-full text-white focus:outline-gray-800"
          />{" "}
          <button className="bg-green-500 h-max w-max rounded-full p-3">
            <IoPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}
