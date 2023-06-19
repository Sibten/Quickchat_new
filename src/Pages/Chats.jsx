import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Chats() {
  const [users, setUsers] = useState([{ user_name: "", user_email: "" }]);

  useEffect(() => {
    let config = {
      method: "get",
      url: "http://localhost:8001/user/getalllist",
      headers: {
        token: Cookies.get("token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return <div>Chats</div>;
}
