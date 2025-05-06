import React, { useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/UserSlice";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";

const SignUp = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);

    if (validateInputs()) {
      await UserSignUp({ name, email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          dispatch(
            openSnackbar({
              message: "Sign Up Successful",
              severity: "success",
            })
          );
          setLoading(false);
          setButtonDisabled(false);
          setOpenAuth(false);
        })
        .catch((err) => {
          setButtonDisabled(false);
          if (err.response) {
            setLoading(false);
            setButtonDisabled(false);
            alert(err.response.data.message);
            dispatch(
              openSnackbar({
                message: err.response.data.message,
                severity: "error",
              })
            );
          } else {
            setLoading(false);
            setButtonDisabled(false);
            dispatch(
              openSnackbar({
                message: err.message,
                severity: "error",
              })
            );
          }
        });
    }
  };

  return (
    <div className="w-full max-w-[500px] flex flex-col gap-9">
      <div>
        <h1 className="text-3xl font-extrabold text-red-600">Create New Account 👋</h1>
        <p className="text-base font-normal text-gray-500/90">Please enter details to create a new account</p>
      </div>
      <div className="flex gap-5 flex-col">
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          handelChange={(e) => setName(e.target.value)}
        />
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
        <Button
          text="Sign Up"
          onClick={handleSignUp}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </div>
  );
};

export default SignUp;