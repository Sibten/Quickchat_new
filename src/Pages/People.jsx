import { Button } from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Pepole() {
  const [users, setUsers] = useState([{ user_name: "", user_email: "" }]);

  const [substractUsers, setSubStractUser] = useState([
    {
      user_name: "",
      user_email: "",
    },
  ]);

  const [printUser, setPrintUser] = useState([
    { user_name: "", user_email: "" },
  ]);

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
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    const config3 = {
      method: "get",
      url: `http://localhost:8001/invitation/my_sent_invitation?email=${Cookies.get(
        "email"
      )}`,
      headers: {
        token: Cookies.get("token"),
      },
    };

    axios(config3)
      .then(function (response) {
        substractUsers.push(...response.data);
        setSubStractUser([...substractUsers]);
      })
      .catch(function (error) {
        console.log(error);
      });
    const config2 = {
      method: "get",
      url: `http://localhost:8001/invitation/my_invitation?email=${Cookies.get(
        "email"
      )}`,
      headers: {
        token: Cookies.get("token"),
      },
    };

    axios(config2)
      .then(function (response) {
        substractUsers.push(...response.data);
        setSubStractUser([...substractUsers]);
      })
      .catch(function (error) {
        console.log(error);
      });
    const config4 = {
      method: "get",
      url: `http://localhost:8001/user/myfriends?email=${Cookies.get("email")}`,
      headers: {
        token: Cookies.get("token"),
      },
    };

    axios(config4)
      .then(function (response) {
        substractUsers.push(...response.data.friends);
        setSubStractUser([...substractUsers]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  const invitePerson = (email) => {
    substractUsers.push({ user_email: email, user_name: email.split("@")[0] });
    const data = JSON.stringify({
      from: Cookies.get("email"),
      to: email,
    });

    const config = {
      method: "post",
      url: "http://localhost:8001/invitation/send",
      headers: {
        token: Cookies.get("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    alert("Invitation Sent!");
  };

  return (
    <div>
      <div className="  text-white p-4 lg:w-1/2  mx-auto ">
        <h1 className="bg-mainBg p-4 text-xl rounded-lg">
          {" "}
          Peoples, You may known
        </h1>
        {console.log(substractUsers)}
        <div className="bg-gray-800 p-4 max-h-[48rem] overflow-y-auto rounded-lg">
          {users.map((u) => {
            const find = substractUsers.findIndex(
              (s) => s.user_email == u.user_email
            );
            if (Cookies.get("email") != u.user_email && find == -1)
              return (
                <div
                  key={u.user_email}
                  className="my-4 flex border border-gray-700 p-4 rounded-md"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3899/3899618.png"
                    alt=""
                    className="w-16 h-16"
                  />
                  <div className="my-2 mx-4">
                    <h1 className=" text-lg">{u.user_name}</h1>
                    <p className="text-sm"> {u.user_email}</p>
                  </div>
                  <div className="w-max ml-auto my-2">
                    <Button
                      className="h-max w-max"
                      onClick={(e) => invitePerson(u.user_email)}
                    >
                      Invite
                    </Button>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}
