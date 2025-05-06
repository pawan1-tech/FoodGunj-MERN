import React, { useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { UserSignIn } from "../api";
import { loginSuccess } from "../redux/reducers/UserSlice";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";

const SignIn = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handelSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      await UserSignIn({ email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          dispatch(
            openSnackbar({
              message: "Login Successful",
              severity: "success",
            })
          );
          setLoading(false);
          setButtonDisabled(false);
          setOpenAuth(false);
        })
        .catch((err) => {
          setLoading(false);
          setButtonDisabled(false);
          dispatch(
            openSnackbar({
              message: err.message,
              severity: "error",
            })
          );
        });
    }
  };

  return (
    <div className="w-full max-w-[500px] flex flex-col gap-9">
      <div>
        <h1 className="text-3xl font-extrabold text-red-600">Welcome to FoodGunj</h1>
        <p className="text-base font-normal text-gray-500/90">Please login with your details here</p>
      </div>
      <div className="flex gap-5 flex-col">
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full text-end text-gray-800 cursor-pointer text-base transition-all duration-300 font-medium hover:text-red-600">
          Forgot Password?
        </button>
        <Button
          text="Sign In"
          onClick={handelSignIn}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </div>
  );
};

export default SignIn;
