import React from "react";
import { useNavigate } from "react-router-dom";

function WaitingForDriver(props) {
  const { ride } = props;
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-sm text-gray-500 absolute right-4 top-6 inline-block">{`OTP:- ${props.ride?.otp}`}</h1>
      <div className="flex mt-6 mb-10 justify-between">
        <img
          className="h-12 w-12 object-contain"
          src="https://www.jaipurcitycab.in/images/car2.png"
          alt="car"
        />
        <div className="text-end">
          <h4 className="text-xs text-gray-500">
            {props.ride?.captian?.firstName +
              " " +
              props.ride?.captian?.lastName}
          </h4>
          <h2 className="font-semibold">
            {props.ride?.captian?.vehicle.plate}
          </h2>
          <h4 className="text-xs text-gray-500">{`${props.ride?.captian?.vehicle.color}, ${props.ride?.captian?.vehicle.vehicleType}, capicity:- ${props.ride?.captian?.vehicle.capicity}`}</h4>
        </div>
      </div>
      <div className="h-[1px] absolute  bg-gray-200 w-full"></div>
      <div>
        <div className="flex items-center mt-4 mb-3">
          <div>
            <i className="ri-map-pin-fill"></i>
          </div>
          <div className="ml-3 mt-2">
            <h3 className="font-semibold text-xl">Pickup</h3>
            <p className="text-sm">{props.start.name}</p>
          </div>
        </div>
        <div className="h-[1px] absolute  bg-gray-200 w-full"></div>

        <div className="flex items-center mt-4 mb-3">
          <div>
            <i className="ri-map-pin-3-fill"></i>
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-xl">Destination</h3>
            <p className="text-sm">{props.end.name}</p>
          </div>
        </div>
        <div className="h-[1px] absolute  bg-gray-200 w-full"></div>

        <div className="flex items-center mt-4 mb-3">
          <div>
            <i className="ri-cash-line"></i>
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-xl">
              ₹{props.fare[props.vehicleType]}
            </h3>
            <p className="text-sm">Cash Cash</p>
          </div>
        </div>
      </div>

      <div className="inline-block bg-green-500 text-white rounded-full absolute right-7">
        <button
          onClick={() => {
            props.setUserChatPanel(true);
          }}
          className="btn btn-ghost"
        >
          chat
        </button>
      </div>
    </div>
  );
}

export default WaitingForDriver;
