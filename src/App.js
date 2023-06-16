import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
import Header from "./Components/Header";

import ChatWindow from "./Pages/ChatWindow";
import ChatRoomPage from "./Pages/ChatRoomPage";

export default function App() {
  return (
    <div className="App h-screen">
      <Header />
      <Routes>
        <Route path={"/"} exact element={<Home />} />
        <Route path={"/chatwindow"} exact element={<ChatWindow />} />
        <Route
          path={"/chatwindow/chatroom/:chatcode"}
          exact
          element={<ChatRoomPage />}
        />
      </Routes>
    </div>
  );
}
