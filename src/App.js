import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
import Header from "./Components/Header";

import ChatWindow from "./Pages/ChatRoomWindow";
import ChatRoomPage from "./Pages/ChatRoomPage";
import Chats from "./Pages/Chats";
import Profile from "./Pages/Profile";

export default function App() {
  return (
    <div className="App h-screen">
      <Header />
      <Routes>
        <Route path={"/"} exact element={<Home />} />
        <Route path="/chats" exact element={<Chats />} />
        <Route path="/profile" exact element={<Profile />} />
      </Routes>
    </div>
  );
}

{
  /* <Route path={"/chatwindow"} exact element={<ChatWindow />} /> */
}
{
  /* <Route
          path={"/chatwindow/chatroom/:chatcode"}
          exact
          element={<ChatRoomPage />}
        /> */
}