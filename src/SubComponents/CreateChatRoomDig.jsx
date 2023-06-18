import React from "react";
import {
  Button,
  DialogHeader,
  DialogFooter,
  DialogBody,
  Input,
  Spinner,
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateChatRoom() {
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState(0);
  const [creating, setCreating] = useState(0);
  const navigate = useNavigate();

  const createChatRoom = () => {
    if (!roomName) {
      setError(1);
    } else {
      setError(0);
      setCreating(1);
      const data = JSON.stringify({
        name: roomName,
        email: Cookies.get("email"),
      });

      const config = {
        method: "post",
        url: "http://localhost:8001/chatroom/create",
        headers: {
          token: Cookies.get("token"),
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          if (response.data.create) {
            setCreating(0);
            navigate(`/chatwindow/chatroom/${response.data.code}`);
          }
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <DialogHeader> Create Chat Room </DialogHeader>
      <p className="mx-4">
        {" "}
        Welcome to Chat Room Creation! Enter room name and continue.
      </p>
      <DialogBody>
        <Input
          label="Room Name"
          onChange={(e) => setRoomName(e.target.value)}
        />
      </DialogBody>
      {error ? (
        <p className="mx-4 text-red-500 absolute">
          {" "}
          Please Provide Valid name!{" "}
        </p>
      ) : (
        ""
      )}
      {creating ? (
        <div className="absolute flex mx-4">
          <Spinner color="blue" className="mx-2" /> Creating{" "}
        </div>
      ) : (
        ""
      )}
      <DialogFooter>
        <Button color="green" className="flex" onClick={createChatRoom}>
          Create
        </Button>
      </DialogFooter>
    </div>
  );
}
