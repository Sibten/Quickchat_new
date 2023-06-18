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

  const [chat, setChat] = useState([
    {
      type: "",
      desc: { message: "", auth: "", time: Date },
    },
  ]);
  const [Message, setMessage] = useState("");

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

    socket.emit("join", params.chatcode);
    socket.emit(
      "new-user-joined",
      params.chatcode,
      Cookies.get("email").split("@")[0]
    );
  }, []);

  socket.on("User Joined", (name) => {
    chat.push({ type: 0, desc: name });
    setChat([...chat]);
  });

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(Message);
    socket.emit("send", Message, params.chatcode, Cookies.get("email"));
  };

  socket.on("new message", (message) => {
    console.log(message);
    chat.push({ type: 1, desc: message });
    setChat([...chat]);
    setMessage("");
  });

  return (
    <div className="lg:w-1/2 lg:mx-auto mx-2 ">
      <div className="p-4 bg-headBg rounded-lg font-bold font-int text-xl text-brown-50 ">
        {" "}
        {roomData.chat_room_name}{" "}
      </div>
      <div className="p-3 bg-mainBg rounded-lg h-[32rem] overflow-y-auto text-gray-300 my-1 font-int">
        <ul className="font-rob text-center">
          {chat.map((s) =>
            s.type == 0 ? (
              <li key={`${s.type}-${new Date()}`}>
                {s.desc.auth == "" ? "You" : s.desc.auth} joined the chat
              </li>
            ) : (
              <li
                className={
                  s.desc.auth == Cookies.get("email")
                    ? "bg-green-700 p-1 my-1 rounded-lg w-max ml-auto clear-left text-black"
                    : "bg-cyan-700 my-1 p-2 rounded-lg w-max clear-right text-black"
                }
              >
                <h3 className="text-xs font-bold my-1">
                  {s.desc.auth.split("@")[0]}
                </h3>{" "}
                <p className="text-left"> {s.desc.message}</p>
                <p className="text-xs text-right">
                  {" "}
                  {new Date(s.desc.time).toLocaleTimeString()}
                </p>
              </li>
            )
          )}
        </ul>
      </div>
      <form>
        <div className="flex font-int">
          <input
            type="text"
            name="chat"
            id="chat"
            value={Message}
            className="bg-headBg text-white p-2 w-full rounded-full"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-green-500 rounded-full h-max w-max  p-2 text-xl mx-2"
            onClick={sendMessage}
            type="submit"
          >
            <IoPaperPlane />
          </button>
        </div>
      </form>
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
