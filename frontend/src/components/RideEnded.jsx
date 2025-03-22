import React, { useEffect } from "react";
import socket from "../services/Socket.service";
import { receiveMessage } from "../store/SocketSlice";
import { connectSocket } from "../store/SocketSlice";
import { useDispatch } from "react-redux";

function RideEnded(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    connectSocket(dispatch);

    socket.on("payment-verified", (message) => {
      dispatch(receiveMessage(message));
      props.setRideEndedPanel(false);
      props.setPaymentReceivePanel(true);
    });
  });

  return (
    <>
      <div>
        <div className="bg-white rounded-lg p-8 shadow-xl max-w-md w-full mx-4">
          <div className="space-y-5">
            <p className="text-gray-600 text-center">
              Your ride has ended successfully!
            </p>
            <div className="flex flex-col items-center space-y-3">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
              <p className="text-gray-600">
                Waiting for payment confirmation...
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RideEnded;
