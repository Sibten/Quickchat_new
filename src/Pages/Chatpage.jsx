import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoPaperPlane } from "react-icons/io5";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { io } from "socket.io-client";
import { useRef } from "react";
import EmojiKeyboard from "../SubComponents/EmojiKeyboard";

export default function Chatpage() {
  const params = useParams();
  const [online, setOnline] = useState("");

  const msgWindowRef = useRef();

  const [curMessage, setCurMessage] = useState({
    auth: {
      user_name: Cookies.get("email").split("@")[0],
      user_email: Cookies.get("email"),
    },
    message: "",
    timestamp: "",
  });
  const [messages, setMessages] = useState([
    {
      auth: {
        user_name: "",
        user_email: "",
      },
      message: "",
      timestamp: "",
    },
  ]);
  const [chatkey, setChatKey] = useState("");
  useEffect(() => {
    let config = {
      method: "get",
      url: `http://localhost:8001/chat/get_two_party_chat?email1=${params.senderid}&email2=${params.recieverid}`,
      headers: {
        token: Cookies.get("token"),
      },
    };

    axios(config)
      .then(function (response) {
        setChatKey(response.data.chatkey);
        setMessages(response.data.messages);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const URL = "http://localhost:8000";
  const socket = io(URL);
  useEffect(() => {
    if (chatkey != "") {
      socket.emit("join", chatkey, Cookies.get("email"));
      socket.emit("user-connect");
    }
  }, [chatkey]);

  socket.on("online", (message) => {
    setOnline(message);
  });

  socket.on("offline", (message) => {
    setOnline(message);
  });

  socket.on("typing", (user) => {
    if (user != Cookies.get("email")) setOnline("Typing...");
  });

  socket.on("ideal", (user) => {
    if (user != Cookies.get("email")) setOnline("Online");
  });

  socket.on("new message", (message) => {
    messages.push(message);
    setMessages([...messages]);
  });
  const sendMsg = (e) => {
    e.preventDefault();
    curMessage.timestamp = new Date();
    socket.emit("send", curMessage, chatkey, Cookies.get("email"));

    const data = JSON.stringify({
      from: Cookies.get("email"),
      to: params.recieverid,
      message: curMessage.message,
    });

    const config = {
      method: "post",
      url: "http://localhost:8001/chat/add",
      headers: {
        token: Cookies.get("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log("sent");
      })
      .catch(function (error) {
        console.log(error);
      });

    setCurMessage({ ...curMessage, message: "" });

    console.log("im in");
    if (msgWindowRef.current) {
      const { scrollHeight, clientHeight } = msgWindowRef.current;
      msgWindowRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  const setEmoji = (emoji) => {
    setCurMessage({ ...curMessage, message: curMessage.message + emoji });
  };

  return (
    <div>
      <div className=" lg:w-1/2 mx-auto p-4">
        <h1 className="bg-mainBg p-2 text-xl text-white flex">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3899/3899618.png"
            alt=""
            className="w-14 h-14"
          />
          <div className="my-2 mx-4">
            <p className=""> {params.recieverid.split("@")[0]}</p>
            <p className="text-xs">{online} </p>
          </div>
        </h1>
        <div
          className="msg bg-headBg h-[32rem] text-gray-300 p-2 rounded-md overflow-y-auto"
          ref={msgWindowRef}
        >
          {messages.map((s) => {
            if (s.auth == null) {
              s.message = s.message.replace(
                params.senderid.split("@")[0],
                "You"
              );
              return (
                <p className="text-center" key={s.timestamp}>
                  {s.message}
                </p>
              );
            } else {
              return Cookies.get("email") == s.auth.user_email ? (
                <div className="bg-green-800 rounded-md p-2 w-max ml-auto clear-left text-right">
                  {" "}
                  <p className="">{s.message}</p>{" "}
                  <small>{new Date(s.timestamp).toLocaleTimeString()}</small>
                </div>
              ) : (
                <div className="bg-blue-800 rounded-md p-2 w-max text-right">
                  {" "}
                  <p className="">{s.message}</p>{" "}
                  <small>{new Date(s.timestamp).toLocaleTimeString()}</small>
                </div>
              );
            }
          })}
        </div>
        <form>
          <div className="flex my-2">
            {" "}
            <EmojiKeyboard callback={setEmoji} />
            <input
              type="text"
              name="msg"
              id="msg"
              placeholder="Type here..."
              value={curMessage.message}
              className="w-full h-max bg-gray-800 p-2 rounded-full text-white focus:outline-gray-800"
              onChange={(e) =>
                setCurMessage({ ...curMessage, message: e.target.value })
              }
              onFocus={() =>
                socket.emit("user-typing", chatkey, Cookies.get("email"))
              }
              onBlur={() =>
                socket.emit("user-ideal", chatkey, Cookies.get("email"))
              }
            />{" "}
            <button
              type="submit"
              className="bg-green-500 h-max w-max rounded-full p-3 mx-2"
              onClick={sendMsg}
            >
              <IoPaperPlane />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
