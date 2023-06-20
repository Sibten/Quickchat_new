import { Button } from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Chats() {
  const [friends, setFriends] = useState([
    {
      _id: "",
      user_name: "",
      user_email: "",
    },
  ]);

  useEffect(() => {
    const config = {
      method: "get",
      url: `http://localhost:8001/user/myfriends?email=${Cookies.get("email")}`,
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoic2hla2h1bHRyYUBnbWFpbC5jb20iLCJpYXQiOjE2ODcxNzk5NDV9.1DtFFdD4FDhP6m8ue4rcx6UQExKJlN7RY_95dWt_fbk",
      },
    };

    axios(config)
      .then(function (response) {
        setFriends(response.data.friends);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <div className="lg:w-1/2 mx-auto">
        <h1 className="bg-mainBg p-4 text-xl  text-white font-bold rounded-md">
          {" "}
          My Chats{" "}
        </h1>
        <div className="bg-gray-800 p-4 rounded text-white">
          {friends.map((s) => (
            <div className="border border-gray-700 p-2 flex" key={s.user_email}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/3899/3899618.png"
                alt=""
                className="w-16 h-16"
              />
              <div className="mx-4 my-2">
                <h2 className="text-xl font-bold tracking-wider">
                  {s.user_name}
                </h2>
                <p>{s.user_email}</p>
              </div>
              <Button
                className="w-max h-max my-2 ml-auto mr-8"
                onClick={() =>
                  navigate(`${Cookies.get("email")}/${s.user_email}`)
                }
              >
                Chat
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
