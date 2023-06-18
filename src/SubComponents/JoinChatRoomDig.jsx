import React from "react";
import {
  Button,
  DialogHeader,
  DialogFooter,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JoinChatRoom() {
  const [chatcode, setChatCode] = useState("");
  const [error, setError] = useState(0);
  const navigate = useNavigate();
  const verifyRoom = () => {
    const config = {
      method: "get",
      url: `http://localhost:8001/chatroom/getchatroom/${chatcode}`,
      headers: {
        token: Cookies.get("token"),
      },
    };

    axios(config)
      .then(function (response) {
        if (response.data) {
          console.log(response.data);
          setError(0);
          navigate(`chatroom/${response.data.chat_room_code}`);
        } else setError(1);
      })
      .catch(function (error) {
        console.log(error);
        setError(1);
      });
  };

  return (
    <div>
      <DialogHeader> Join Chat Room </DialogHeader>
      <p className="mx-4">
        {" "}
        Welcome to Chat Room! Enter Room Credential and continue.
      </p>
      <DialogBody>
        <Input
          label="Room Code"
          onChange={(e) => setChatCode(e.target.value)}
        />
      </DialogBody>
      {error ? (
        <p className="text-red-500 mx-4">Inavlaid Chat Room Code</p>
      ) : (
        ""
      )}
      <DialogFooter>
        <Button color="blue" onClick={verifyRoom}>
          Join
        </Button>
      </DialogFooter>
    </div>
  );
}
