import React, { useState } from "react";
import { Input, Button } from "../components/index";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Captiansignup } from "../store/CaptianAuthSlice.js";
import axios from "axios";

function CaptianSignup() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submit = async (data) => {
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/captian/register`,
        data,
        { withCredentials: true }
      );
      if (response.status === 201) {
        dispatch(Captiansignup(data));
        localStorage.setItem("token", response.data.data.accessToken);
        navigate("/captian-login");
      }
    } catch (error) {
      setError("email is not valid or already registered");
    }
  };

  return (
    <div>
      <div>
        <div className="inline-block pl-5 pb-12">
          <img
            className="w-[6rem] h-[6rem]"
            src="https://brandlogos.net/wp-content/uploads/2021/12/uber-brandlogo.net_.png"
            alt="logo"
          />
        </div>
        <form
          onSubmit={handleSubmit(submit)}
          className="p-7 flex flex-col justify-around -mt-[5rem] gap-2"
        >
          <div className="flex flex-col">
            <Input
              className="h-9 -mt-3"
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
              className="h-9 -mt-3"
              label="Last Name"
              type="text"
              placeholder="Enter your last name"
              {...register("lastName", {
                required: "Last name is required",
              })}
            />
          </div>
          <div className="mt-3 flex flex-col">
            <Input
              className="h-9 -mt-3"
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
              className="h-9 -mt-3"
              label="Enter your Password"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            ></Input>
          </div>

          <div className="py-2">
            <label htmlFor="" className="font-medium text-base relative top-2">
              Vehicle Information
            </label>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Input
                className="h-9"
                type="text"
                placeholder="Vehicle Color"
                {...register("vehicle.color", {
                  required: "Vehicle color is required",
                })}
              />
              <Input
                className="h-9"
                type="text"
                placeholder="License Plate"
                {...register("vehicle.plate", {
                  required: "License plate is required",
                })}
              />
              <Input
                className="h-9"
                type="number"
                placeholder="Seating Capacity"
                {...register("vehicle.capicity", {
                  required: "Capacity is required",
                  min: { value: 1, message: "Minimum capacity is 1" },
                })}
              />
              <select
                className="bg-gray-200 rounded h-9"
                {...register("vehicle.vehicleType", {
                  required: "Vehicle type is required",
                })}
              >
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moterbike">Motorbike</option>
              </select>
            </div>
          </div>
          {error && <p className="text-red-700 text-sm font-mono">{error}</p>}
          <div>
            <Button className="w-full">Sign up</Button>
          </div>
        </form>
        <div className="relative bottom-6">
          <p className="text-xs px-7">
            Already have a account?{" "}
            <Link className="text-blue-900 text-xs" to="/captian-login">
              click here to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CaptianSignup;
