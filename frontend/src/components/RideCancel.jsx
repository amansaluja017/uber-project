import React from "react";

function RideCancel(props) {
  return (
    <>
      <div
        onClick={() => {
          props.setRideCancelPanel(false);
        }}
        className="flex justify-end"
      >
        <i className="text-2xl text-gray-500 ri-close-fill"></i>
      </div>
      <div className="flex flex-col min-h-screen bg-gray-100 my-10">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Ride Cancelled
          </h2>
          <p className="text-gray-600">
            Your ride has been cancelled successfully.
          </p>
        </div>
      </div>
    </>
  );
}

export default RideCancel;
