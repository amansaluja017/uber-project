import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import { connectSocket } from "../store/SocketSlice";
import { useDispatch, useSelector } from "react-redux";
import LiveTracking from "../components/liveTraking";
import RideEnded from "../components/RideEnded";
import PaymentReceive from "../components/PaymentReceive";

function CaptianRide() {
  const { messages } = useSelector((state) => state.socket);
  const distance = messages[0]?.distance;
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const [rideEndedPanel, setRideEndedPanel] = useState(false);
  const [paymentReceivePanel, setPaymentReceivePanel] = useState(false);
  const finishRidePanelRef = useRef();
  const rideEndedPanelRef = useRef();
  const paymentReceivePanelRef = useRef();
  const location = useLocation();
  const rideData = location?.state?.ride;
  const dispatch = useDispatch();

  useEffect(() => {
    connectSocket(dispatch);
  });

  const endRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/rides/end-ride`,
        {
          rideId: rideData._id,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error ending ride:", error);
    }
  };

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
    if (rideEndedPanel) {
      gsap.to(rideEndedPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(rideEndedPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
    if (paymentReceivePanel) {
      gsap.to(paymentReceivePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(paymentReceivePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishRidePanel, rideEndedPanel, paymentReceivePanel]);

  return (
    <div className="h-screen">
      <div className="absolute z-10 flex justify-between items-center w-full">
        <img
          className="w-[4rem] h-[4rem]"
          src="https://brandlogos.net/wp-content/uploads/2021/12/uber-brandlogo.net_.png"
          alt="logo"
        />
        <div className="flex h-8 w-8 z-10 justify-center items-center">
          <Link to="/captian-logout">
            <i className="bg-white p-1 rounded-full ri-logout-box-r-line"></i>
          </Link>
        </div>
      </div>
      <div className="h-[85%]">
        <LiveTracking className="h-full object-cover" />
      </div>
      <div className="h-[15%] p-5 bg-yellow-500 flex flex-col justify-center">
        <h5
          onClick={() => {
            setFinishRidePanel(true);
          }}
          className="text-center font-bold text-xl"
        >
          <i className="ri-arrow-up-wide-line"></i>
        </h5>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-base">{distance} KM away</h2>
          <Button
            onClick={() => {
              setFinishRidePanel(true);
            }}
            className="w-[60%] bg-green-700"
          >
            Complete Ride
          </Button>
        </div>
      </div>

      <div
        ref={finishRidePanelRef}
        className="h-full bg-white flex top-[20%] z-11 fixed translate-y-full flex-col w-full"
      >
        <h5
          onClick={() => {
            setFinishRidePanel(false);
          }}
          className="text-center font-bold text-gray-300 text-2xl"
        >
          <i className="ri-arrow-down-wide-fill"></i>
        </h5>
        <h3 className="absolute top-0 text-xl font-bold mt-8 p-4">
          Finish this Ride{" "}
        </h3>
        <FinishRide
          setFinishRidePanel={setFinishRidePanel}
          endRide={endRide}
          setRideEndedPanel={setRideEndedPanel}
          rideData={rideData}
        />
      </div>

      <div
        ref={rideEndedPanelRef}
        className="h-full translate-y-full bg-white flex z-11 fixed top-[75%] flex-col w-full"
      >
        <RideEnded
          setRideEndedPanel={setRideEndedPanel}
          setPaymentReceivePanel={setPaymentReceivePanel}
          endRide={endRide}
        />
      </div>

      <div
        ref={paymentReceivePanelRef}
        className="h-full bg-green-400 translate-y-full flex z-11 fixed top-[75%] justify-center py-5 w-full"
      >
        <PaymentReceive />
      </div>
    </div>
  );
}

export default CaptianRide;
