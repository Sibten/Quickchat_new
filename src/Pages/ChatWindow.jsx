import { Alert, Button, Dialog } from "@material-tailwind/react";
import React from "react";
import { useState } from "react";
import CreateChatRoom from "../SubComponents/CreateChatRoomDig";
import JoinChatRoom from "../SubComponents/JoinChatRoomDig";
import RecentRooms from "../SubComponents/RecentRooms";

export default function ChatWindow() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);

  const handleOpenCreate = () => setOpenCreate(!openCreate);
  const handleOpenJoin = () => setOpenJoin(!openJoin);
  return (
    <>
      <div className="p-4 font-head mx-8 lg:w-1/2 lg:mx-auto border border-gray-500 my-4 rounded-md">
        <h1 className="text-white text-2xl"> Chat Rooms </h1>
        <div className="flex flex-wrap justify-center">
          <div className="my-4 md:my-16 h-max w-max mx-4 bg-green-100 p-4 rounded-lg shadow-lg text-center">
            <h1 className="font-bold text-lg tracking-wide"> Create Room </h1>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/2645/2645420.png"
                alt="room"
              />
            </div>
            <Button color="green" onClick={handleOpenCreate}>
              Create Room
            </Button>
          </div>
          <div className="my-4 md:my-16 h-max w-max mx-4 bg-blue-100 p-4 rounded-lg shadow-lg text-center">
            <h1 className="font-bold text-lg tracking-wide"> Join Room </h1>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/5500/5500817.png"
                alt="room"
              />
            </div>
            <Button color="blue" onClick={handleOpenJoin}>
              Join Room
            </Button>
          </div>
        </div>

        <Dialog
          open={openCreate}
          handler={handleOpenCreate}
          size="xs"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <CreateChatRoom />
        </Dialog>

        <Dialog
          open={openJoin}
          handler={handleOpenJoin}
          size="xs"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          {" "}
          <JoinChatRoom />{" "}
        </Dialog>
      </div>
    </>
  );
}
