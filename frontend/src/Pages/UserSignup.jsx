import React, { useState } from "react";
import { Input, Button } from "../components/index.js";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Signup } from "../store/UserAuthSlice.js";
import axios from "axios";

function UserSignup() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submit = async (data) => {
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/register`,
        data
      );
      if (response.status === 200) {
        dispatch(Signup(data));
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setError("email is not valid or already registered");
    }
  };

  return (
    <div>
      <div>
        <div className="p-7">
          <img
            className="w-[6rem] h-[6rem]"
            src="https://brandlogos.net/wp-content/uploads/2021/12/uber-brandlogo.net_.png"
            alt="logo"
          />
        </div>
        <form
          onSubmit={handleSubmit(submit)}
          className="p-7 flex flex-col justify-around"
        >
          <div className="flex flex-col">
            <Input
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
              })}
            />
          </div>
          <div className="mt-3 flex flex-col">
            <Input
              label="Last Name"
              type="text"
              placeholder="Enter your last name"
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
              })}
            />
          </div>
          <div className="mt-3 flex flex-col">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          <div className="mt-3 flex flex-col">
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
          </div>
          {error && <p className="text-red-700 text-sm font-mono">{error}</p>}
          <div>
            <Button className="w-full">Sign up</Button>
          </div>
        </form>
        <p className="text-sm px-7">
          Already have a account?{" "}
          <Link className="text-blue-900 text-sm" to="/login">
            click here to login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserSignup;
