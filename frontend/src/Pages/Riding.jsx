import React, { useEffect, useState, useRef } from "react";
import { Button } from "../components/index";
import { Link, useLocation } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import socket from "../services/Socket.service";
import { useDispatch, useSelector } from "react-redux";
import {
  connectSocket,
  disconnectSocket,
  receiveMessage,
} from "../store/SocketSlice";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/liveTraking";
import RideInfo from "../components/RideInfo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MakePayment from "../components/MakePayment";

function Riding() {
  const { messages } = useSelector((state) => state.socket);
  const distance = messages[0]?.distance;
  const rideInfoRef = useRef();
  const makePaymentRef = useRef();
  const [rideInfoPanel, setRideInfoPanel] = useState(false);
  const [makePaymentPanel, setMakePaymentPanel] = useState(false);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { ride } = state || {};
  const navigate = useNavigate();

  useGSAP(() => {
    if (rideInfoPanel) {
      gsap.to(rideInfoRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(rideInfoRef.current, {
        transform: "translateY(100%)",
      });
    }
    if (makePaymentPanel) {
      gsap.to(makePaymentRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(makePaymentRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [rideInfoPanel, makePaymentPanel]);

  useEffect(() => {
    connectSocket(dispatch);

    socket.off("rideEnded");

    socket.on("rideEnded", (message) => {
      dispatch(receiveMessage(message));
      setMakePaymentPanel(true);
    });

    return () => {
      socket.off("rideEnded");
      disconnectSocket(dispatch);
    };
  }, [dispatch, navigate]);

  return (
    <div className="h-screen">
      <div className="fixed flex h-8 w-8 z-10 justify-center items-center rounded-full top-2 right-2 bg-white">
        <Link to="/home">
          <i className="ri-home-line"></i>
        </Link>
      </div>
      <div className="h-[85%] contain-content">
        <LiveTracking className="h-full object-cover" />
      </div>

      <div className="h-[15%] p-5 bg-yellow-500 flex flex-col justify-center">
        <h5
          onClick={() => {
            setRideInfoPanel(true);
          }}
          className="text-center font-bold text-xl"
        >
          <i className="ri-arrow-up-wide-line"></i>
        </h5>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-base">{distance} KM away</h2>
          <Button
            onClick={() => {
              setRideInfoPanel(true);
            }}
            className="w-[60%] bg-green-700"
          >
            view ride info
          </Button>
        </div>
      </div>

      <div
        ref={rideInfoRef}
        className="h-[55%] w-full p-4 absolute bottom-0 bg-white translate-y-full"
      >
        <h5
          onClick={() => {
            setRideInfoPanel(false);
          }}
          className="relative bottom-[1rem] text-center font-medium text-2xl"
        >
          <i className="text-gray-300 ri-arrow-down-wide-fill"></i>
        </h5>
        <RideInfo ride={ride} />
      </div>

      <div
        ref={makePaymentRef}
        className="h-[60%] w-full p-5 absolute bottom-0 bg-white translate-y-full"
      >
        <MakePayment ride={ride} />
      </div>
    </div>
  );
}

export default Riding;
