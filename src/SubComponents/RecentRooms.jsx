import { Alert, Badge, Button } from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function RecentRooms({ update }) {
  const [data, setData] = useState([
    { chat_room_name: "", chat_room_code: "", message: [] },
  ]);

  useEffect(() => {
    const config = {
      method: "get",
      url: "http://localhost:8001/chatroom/myrooms",
      headers: {
        token: Cookies.get("token"),
      },
    };

    axios(config)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [update]);

  return (
    <div>
      <div className="p-4 font-head mx-8 lg:w-1/2 lg:mx-auto border border-gray-500 my-4 rounded-md max-h-96 overflow-y-auto">
        <h1 className="text-white text-xl">Recent Rooms </h1>
        <div className="my-4">
          {data.map((s) => (
            <div
              key={s.chat_room_code}
              className="bg-gray-600 rounded-lg p-4 px-4 flex justify-between text-lg my-2 font-bold"
            >
              {s.chat_room_name}
              <div className="bg-green-500 rounded-full p-2 px-4">
                {s.message.length}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
