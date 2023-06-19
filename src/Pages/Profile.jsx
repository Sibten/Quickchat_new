import { Button } from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useState } from "react";

export default function Profile() {
  const [userData, setUserData] = useState({
    user_name: "",
    user_email: "",
  });

  useEffect(() => {
    const config = {
      method: "get",
      url: `http://localhost:8001/user/getmyprofile?email=${Cookies.get(
        "email"
      )}`,
      headers: {
        token: Cookies.get("token"),
      },
    };

    axios(config)
      .then(function (response) {
        setUserData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (Cookies.get("email")) {
    return (
      <div>
        <div className="border lg:mx-auto mx-4 lg:w-1/4 p-2 border-gray-700 rounded-md ">
          <h1 className="text-center text-white border-b border-gray-700 my-2 font-bold">
            {" "}
            My Profile{" "}
          </h1>
          <div className="flex">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3899/3899618.png"
              alt="profile"
              className="w-24 h-24"
            />
            <div className="text-white mx-8 my-4">
              <h1 className="text-2xl tracking-wider">{userData.user_name} </h1>
              <p> {userData.user_email} </p>
            </div>
          </div>
        </div>

        <div className="border border-gray-700 my-4 lg:w-1/4 lg:mx-auto mx-4 rounded-lg p-4">
          <h1 className="my-2 p-1 text-center text-white border-b border-gray-700 mx-2 font-bold">
            {" "}
            Invitation Request{" "}
          </h1>
          <div>
            <div className="mx-4 my-2 flex">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3899/3899618.png"
                alt=""
                className="w-16 h-16"
              />
              <div className="my-2 mx-4 text-gray-300">
                <h2 className="text-xl "> nirmalshah25019 </h2>
                <p>nirmalshah25019@gmail.com</p>
              </div>
              <div className="my-2 ml-auto w-max flex">
                <button>
                  {" "}
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/845/845646.png"
                    className="w-10 h-10 mx-4 cursor-pointer"
                  />{" "}
                </button>
                <button>
                  {" "}
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/753/753345.png"
                    className="w-10 h-10 cursor-pointer"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-xl text-white text-center">
        {" "}
        Hmm! You can see this after Login!!{" "}
      </div>
    );
  }
}
