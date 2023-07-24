import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
import Header from "./Components/Header";

import Pepole from "./Pages/People";
import Profile from "./Pages/Profile";
import Chats from "./Pages/Chats";
import Chatpage from "./Pages/Chatpage";

export default function App() {
  return (
    <div className="App h-screen">
      <Header />
      <Routes>
        <Route path={"/"} exact element={<Home />} />
        <Route path="/people" exact element={<Pepole />} />
        <Route path="/chats" exact element={<Chats />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route
          path="/chats/:senderid/:recieverid"
          exact
          element={<Chatpage />}
        />
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