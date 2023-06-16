import { Button } from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoPaperPlane } from "react-icons/io5";
import { io } from "socket.io-client";

export default function ChatRoomPage() {
  const params = useParams();

  const [roomData, setRoomData] = useState({
    chat_room_name: "",
    chat_room_code: "",
    admin: {
      user_name: "",
      user_email: "",
    },
  });
  const URL = "http://localhost:8000";
  const socket = io(URL, { query: { room: params.chatcode } });

  const [join, setJoin] = useState(0);

  useEffect(() => {
    console.log(params.chatcode);
    const config = {
      method: "get",
      url: `http://localhost:8001/chatroom/getchatroom/${params.chatcode}`,
      headers: {
        token: Cookies.get("token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setRoomData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    socket.emit("join", params.chatcode);
    socket.emit(
      "new-user-joined",
      params.chatcode,
      Cookies.get("email").split("@")[0]
    );
    socket.on("User Joined", (name) => {
      join.push(`${name} is join the conversation`);
    });
  }, []);

  return (
    <div className="lg:w-1/2 lg:mx-auto mx-2 ">
      {join ? (
        <>
          <div className="bg-gray-700 p-4 rounded-md">
            {" "}
            <h1 className="text-xl font-head text-white font-bold">
              {" "}
              {roomData.chat_room_name}{" "}
            </h1>{" "}
          </div>
          <div className="msgbox border h-[28rem] lg:h-[44rem] rounded-md border-gray-700 -mt-2 overflow-y-auto p-4">
            {join.map((s) => (
              <p key={s} className="text-white">
                {s}
              </p>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              className="w-full bg-gray-700 rounded-full my-2 p-2 text-white text-xl border-gray-700 font-main h-max focus:outline-gray-700 "
            ></input>
            <button className="rounded-full bg-green-600 text-xl h-max my-2 mx-2 p-3">
              <IoPaperPlane />
            </button>
          </div>{" "}
        </>
      ) : (
        <Button>Join the Chat</Button>
      )}
    </div>
  );
}

{
  /* <div className="bg-green-700 p-1 my-1 rounded-lg w-max clear-right">
<h3 className="text-xs font-bold my-1">Nirmal</h3>
<p> Hello How are you ?</p>
</div>
<div className="bg-cyan-500 my-1 p-2 rounded-lg w-max ml-auto clear-left">
I'm Fine
</div> */
}
