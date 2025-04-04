import React from "react";
import { Button } from "../components/index";
import { useSelector } from "react-redux";

function RidePopup(props) {
  const { messages } = useSelector((state) => state.socket);
  const distance = messages[0]?.distance;

  const userFirstName = props.ride?.user.firstName;
  const userLastName = props.ride?.user.lastName;
  const userAvatar = props.ride?.user.avatar
  const payment = props.ride?.fare;

  return (
    <div>
      <div>
        <div className="flex justify-between mt-5 bg-yellow-300 py-4 w-full rounded-xl">
          <div className="flex justify-center items-center gap-2 px-2">
            <img
              className="h-10 w-10 object-cover rounded-full"
              src={userAvatar}
              alt="avatar"
            />
            <h3 className="font-semibold">{`${userFirstName} ${userLastName}`}</h3>
          </div>

          <div className="text-start px-2 flex justify-center items-center">
            <h2 className="font-semibold text-sm">{distance} KM</h2>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex items-center mt-4 mb-3">
            <div>
              <i className="ri-map-pin-fill"></i>
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-sm">Pickup</h3>
              <p className="text-sm text-gray-600">{props.ride?.start}</p>
            </div>
          </div>

          <div className="flex items-center mt-4 mb-3">
            <div>
              <i className="ri-map-pin-3-fill"></i>
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-sm">Destination</h3>
              <p className="text-sm text-gray-600">{props.ride?.end}</p>
            </div>
          </div>

          <div className="flex items-center mt-4 mb-3">
            <div>
              <i className="ri-cash-line"></i>
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-sm">₹{payment}</h3>
              <p className="text-sm text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          props.setConfirmRidePopupPanel(true);
          props.setRidePopupPanel(false);
          props.confirmRide();
        }}
        className="bg-green-700 mt-8 w-full"
      >
        Accept
      </Button>
      <Button
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
        className="bg-gray-500 mt-[2%] w-full"
      >
        Ignore
      </Button>
    </div>
  );
}

export default RidePopup;
