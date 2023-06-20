import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dialog } from "@material-tailwind/react";
import Login from "./Login";
import Cookies from "js-cookie";
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";

export default function Header() {
  const [open, setOpen] = useState(false);

  const [login, setLogin] = useState(Cookies.get("email"));

  const navigate = useNavigate();
  useEffect(() => {
    setLogin(Cookies.get("email"));
  }, [Cookies.get("email")]);

  const handleOpen = () => setOpen(!open);
  return (
    <div className="p-4 flex flex-wrap  justify-around text-white">
      <Link to="/">
        <h1 className="text-2xl font-pop text-white font-bold">Quick Chat</h1>
      </Link>
      <div className="flex">
        {" "}
        {login ? (
          <>
            <ul className="flex mx-8 font-int flex-wrap">
              <li>
                <Link to="/chats">
                  <h1 className="text-xl mx-2 my-1 flex">
                    {" "}
                    <HiChatBubbleOvalLeftEllipsis className="my-1 mx-2" /> Chat
                  </h1>
                </Link>
              </li>
              <li>
                <Link to="/people">
                  {" "}
                  <h1 className="text-xl mx-2 my-1 flex">
                    {" "}
                    <BsPeopleFill className="my-1 mx-2" /> People
                  </h1>
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <h1 className="text-xl mx-2 my-1 flex">
                    {" "}
                    <FaUser className="my-1 mx-2" /> Profile
                  </h1>
                </Link>
              </li>
            </ul>
            <Button
              color="green"
              onClick={() => {
                handleOpen();
                setLogin(Cookies.remove("email"));
                navigate("/");
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleOpen} variant="filled" color="green">
              Login
            </Button>
            <Dialog
              open={open}
              handler={handleOpen}
              size="xs"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
              }}
            >
              <Login />
            </Dialog>{" "}
          </>
        )}
      </div>
    </div>
  );
}
