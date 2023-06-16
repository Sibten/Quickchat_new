import { socket } from "./Socket.js";
import React from "react";

function Demo() {
  const [join, setJoin] = React.useState(0);
  const [mesg, setMsg] = React.useState([]);
  const [curMsg, setCurMsg] = React.useState("");
  React.useEffect(() => {
    if (join == 1) {
      const name = prompt("Enter name");
      socket.emit("new-user-joined", name);
    }
  }, [join]);

  socket.on("user-joined", (name) => {
    console.log("");
    setMsg([...mesg, `${name} joined `]);
  });

  socket.on("message", (message) => {
    setMsg([...mesg, message]);
  });

  const send = (e) => {
    socket.emit("send", curMsg);
  };

  return (
    <div className="App">
      <button onClick={() => setJoin(!join)}>
        {join ? "Disconnect" : "Connect"}
      </button>
      <div>
        <ul>
          {" "}
          {mesg.map((m) => (
            <li key={m}>{m}</li>
          ))}{" "}
        </ul>
      </div>
      <input
        type="text"
        name=""
        id=""
        onChange={(e) => {
          setMsg([...mesg, e.target.value]);
          setCurMsg(e.target.value);
        }}
      />{" "}
      <button onClick={send}>Send</button>
    </div>
  );
}

export default App;
