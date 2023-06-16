import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  DialogHeader,
  DialogFooter,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const [authData, setAuthData] = useState({ email: "", otp: "" });
  const [sentOTP, setsentOTP] = useState(0);
  const [mailSent, setMailSent] = useState(0);
  const validateEmail = (e) => {
    let emailRegx = /^[A-Za-z0-9\-._]+@([A-Za-z0-9-]+\.)+[a-z]{2,4}$/gm;
    if (emailRegx.test(e.target.value)) {
      setContinuedisable(0);
      setAuthData({ ...authData, email: e.target.value });
    } else {
      setContinuedisable(1);
    }
  };

  const sendMail = () => {
    setError(0);
    const data = JSON.stringify({
      email: authData.email,
    });

    const config = {
      method: "post",
      url: "http://localhost:8001/user/generateotp",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log(config);
    axios(config)
      .then(function (response) {
        setMailSent(1);
        console.log(response.data);
      })
      .catch(function (error) {
        setError(1);
        console.log(error);
      });

    setsentOTP(1);
  };

  const [error, setError] = useState(0);
  const navigate = useNavigate();

  const verifyOTP = () => {
    const data = JSON.stringify(authData);

    const config = {
      method: "post",
      url: "http://localhost:8001/user/verify",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log(config);
    axios(config)
      .then(function (response) {
        console.log(response.data);
        Cookies.set("email", authData.email);
        Cookies.set("token", response.data.token);
        navigate("/chatwindow");
      })
      .catch(function (error) {
        console.log(error);
        setError(1);
      });
  };

  const [continueDisable, setContinuedisable] = useState(1);
  return (
    <div className="p-4">
      <DialogHeader className="font-head flex">
        <img
          src="https://cdn-icons-png.flaticon.com/128/666/666201.png"
          alt=""
          className="w-8 mr-4"
        />{" "}
        <h1>Login / Signup</h1>
      </DialogHeader>
      <DialogBody>
        <p className="text-small mt-1 ">
          Welcome to Quick Chat, Here enter your email and continue.
        </p>
        <div className="my-6">
          {sentOTP && !error ? (
            <>
              <p className="text-xs my-2">
                {" "}
                {mailSent
                  ? `OTP is sent to the ${authData.email}`
                  : "Sending..."}
              </p>
              <Input
                label="OTP"
                className="text-lg font-head"
                value={authData.otp}
                onChange={(e) =>
                  setAuthData({ ...authData, otp: e.target.value })
                }
              />
            </>
          ) : (
            <Input
              label="Email"
              className="text-lg font-head"
              onChange={validateEmail}
            />
          )}
        </div>
        {error ? (
          <p className="block text-right -mt-4 text-red-500 text-md">
            Something Bad Happen!
          </p>
        ) : (
          ""
        )}
      </DialogBody>
      <DialogFooter>
        {sentOTP && !error ? (
          <Button color="green" onClick={verifyOTP}>
            Verify OTP
          </Button>
        ) : (
          <Button color="green" disabled={continueDisable} onClick={sendMail}>
            Send OTP
          </Button>
        )}
      </DialogFooter>
      <p className="mx-4 text-green-700 mt-4">Terms and Condition</p>
    </div>
  );
}
