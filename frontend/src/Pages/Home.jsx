import React, { useEffect, useState } from "react";
import {
  Input,
  LocationSearchPanel,
  VehiclePanel,
  ConfirmVehcile,
  LookingForDriver,
  WaitingForDriver,
  Button,
} from "../components/index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import "remixicon/fonts/remixicon.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  connectSocket,
  disconnectSocket,
  receiveMessage,
  sendMessage,
} from "../store/SocketSlice.js";
import socket from "../services/Socket.service.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LiveTracking from "../components/liveTraking.jsx";
import RideCancel from "../components/RideCancel.jsx";
import UserChat from "../components/UserChat.jsx";

function Home() {
  const [openPanel, setOpenPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmVehiclePanel, setconfirmVehiclePanel] = useState(false);
  const [lookingDriverPanel, setlookingDriverPanel] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const [startLocation, setStartLocation] = useState([]);
  const [endLocation, setEndLocation] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState("");
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const [rideCancelPanel, setRideCancelPanel] = useState(false);
  const [userChatPanel, setUserChatPanel] = useState(false);
  const [rating, setRating] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const find = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmVehiclePanelRef = useRef(null);
  const lookingDriverPanelRef = useRef(null);
  const waitingForDriverPanelRef = useRef(null);
  const inputRef = useRef(null);
  const suggestionRef = useRef(null);
  const rideCancelPanelRef = useRef(null);
  const userChatPanelRef = useRef(null);

  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { state } = useLocation();
  const { payment } = state || {};

  const pickup = typeof start === "object" ? start.name : start;
  const destination = typeof end === "object" ? end.name : end;

  useEffect(() => {
    connectSocket(dispatch);

    sendMessage({
      event: "join",
      data: { userType: "user", userId: user._id },
    });

    socket.on("ride-confirmed", (message) => {
      setWaitingForDriverPanel(true);
      dispatch(receiveMessage(message));
      setRide(message);
    });

    socket.on("ride-started", (message) => {
      setWaitingForDriverPanel(false);
      dispatch(receiveMessage(message));
      navigate("/riding", { state: { ride: message } });
    });

    socket.on("rideCancelled", (message) => {
      dispatch(receiveMessage(message));
      setlookingDriverPanel(false);
      setWaitingForDriverPanel(false);
      setVehiclePanel(false);
      setconfirmVehiclePanel(false);
      setRideCancelPanel(true);
    });

    return () => {
      socket.off("rideCancelled");
      disconnectSocket(dispatch);
    };
  }, [dispatch]);

  const handlePickup = async (e) => {
    const value = e.target.value;
    setStart(value);

    if (value.trim().length < 3) {
      setStartLocation([]);
      return;
    }

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/maps/get-suggestions`,
        {
          params: { input: value },
        }
      );

      setStartLocation(data.data);
    } catch (error) {
      setStartLocation([]);
    }
  };

  const handleDestination = async (e) => {
    const value = e.target.value;
    setEnd(value);

    if (value.trim().length < 3) {
      setEndLocation([]);
      return;
    }

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/maps/get-suggestions`,
        {
          params: { input: value },
        }
      );

      setEndLocation(data.data && Array.isArray(data.data) ? data.data : data);
    } catch (error) {
      setEndLocation([]);
    }
  };

  const findTrip = async () => {
    setVehiclePanel(true);
    setOpenPanel(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/v1/rides/get-price`,
      {
        params: {
          start: `${start.lat},${start.lng}`,
          end: `${end.lat},${end.lng}`,
        },
      }
    );
    setFare(response.data.data);
  };

  async function createRide() {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/rides/create`,
      {
        start,
        end,
        vehicleType,
      },
      { withCredentials: true }
    );
  }

  useGSAP(() => {
    if (openPanel) {
      gsap.to(panelRef.current, {
        height: "70%",
        paddingLeft: "6%",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        display: "block",
      });
      gsap.to(find.current, {
        opacity: 0,
        display: "none",
      });
    } else if (!openPanel) {
      gsap.to(panelRef.current, {
        height: "0%",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        display: "none",
      });
      gsap.to(find.current, {
        opacity: 1,
        display: "block",
      });
    }
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
    if (confirmVehiclePanel) {
      gsap.to(confirmVehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmVehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
    if (lookingDriverPanel) {
      gsap.to(lookingDriverPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(lookingDriverPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
    if (waitingForDriverPanel) {
      gsap.to(waitingForDriverPanelRef.current, {
        transform: "translateY(0)",
      });
      gsap.to(lookingDriverPanelRef.current, {
        transform: "translateY(100%)",
      });
    } else {
      gsap.to(waitingForDriverPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
    if (rideCancelPanel) {
      gsap.to(rideCancelPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(rideCancelPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
    if (userChatPanel) {
      gsap.to(userChatPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(userChatPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [
    openPanel,
    vehiclePanel,
    confirmVehiclePanel,
    lookingDriverPanel,
    waitingForDriverPanel,
    rideCancelPanel,
    userChatPanel,
  ]);

  const giveRating = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/rides/ride-rating`,
        { rideId: payment?.message._id, rating },
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/home", {
          state: { ...state, payment: { ...payment, paymentStatus: false } },
        });
        setPaymentStatus(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen">
      <div className="h-full">
        <div className="absolute z-10 flex items-center justify-between w-full">
          <img
            className="w-[4rem] h-[4rem]"
            src="https://brandlogos.net/wp-content/uploads/2021/12/uber-brandlogo.net_.png"
            alt="logo"
          />
          <div className="flex h-8 w-8 z-10 justify-center items-center">
            <Link to="/logout">
              <i className="bg-white p-1 rounded-full ri-logout-box-r-line"></i>
            </Link>
          </div>
        </div>
        <div className="h-full">
          <LiveTracking />
        </div>
      </div>

      <div>
        <div
          ref={inputRef}
          className="flex flex-col justify-end top-0 h-screen z-20"
        >
          <div
            ref={suggestionRef}
            className="h-[30%] p-3 bg-white absolute bottom-0"
          >
            <h5
              className="text-2xl"
              onClick={() => {
                setOpenPanel(false);
              }}
            >
              <i ref={panelCloseRef} className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 ref={find} className="text-xl font-bold">
              Find a trip
            </h3>
            <form className="relative">
              <div className="h-13 absolute w-[.78%] bg-black top-[30%] left-[4%] rounded-full"></div>
              <Input
                onChange={handlePickup}
                onClick={() => {
                  setOpenPanel(true);
                  setActiveField("start");
                  inputRef.current.classList.add("absolute");
                  suggestionRef.current.classList.remove("absolute");
                }}
                type="text"
                placeholder="Add a pick up location"
                className="h-9 px-7 mt-3 w-full"
                value={pickup}
              ></Input>
              <Input
                onChange={handleDestination}
                onClick={() => {
                  setOpenPanel(true);
                  setActiveField("end");
                  inputRef.current.classList.add("absolute");
                  suggestionRef.current.classList.remove("absolute");
                }}
                type="text"
                placeholder="Enter your destination"
                className="h-9 mt-4 w-full px-7 "
                value={destination}
              ></Input>
            </form>

            <Button
              onClick={() => {
                findTrip();
                inputRef.current.classList.remove("z-20");
              }}
              className="w-full"
            >
              Find Trip
            </Button>
          </div>
          <div ref={panelRef} className="bg-white h-[70%] p-6">
            <LocationSearchPanel
              suggestions={
                activeField === "start" ? startLocation : endLocation
              }
              setOpenPanel={setOpenPanel}
              setVehiclePanel={setVehiclePanel}
              setStart={setStart}
              setEnd={setEnd}
              activeField={activeField}
            />
          </div>
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="h-screen bg-white flex top-[30%] translate-y-full fixed flex-col w-full p-4"
      >
        <h3 className="absolute top-3 text-xl font-bold py-4">
          Choose a Vehicle{" "}
        </h3>
        <h5
          onClick={() => {
            setVehiclePanel(false);
          }}
          className="relative bottom-[1rem] text-center font-medium text-2xl"
        >
          <i className="text-gray-300 ri-arrow-down-wide-fill"></i>
        </h5>
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          setconfirmVehiclePanel={setconfirmVehiclePanel}
          fare={fare}
          selectVehicle={setVehicleType}
        />
      </div>

      <div
        ref={confirmVehiclePanelRef}
        className="h-screen bg-white flex top-[30%] translate-y-full fixed flex-col w-full p-4"
      >
        <h3 className="absolute top-3 text-xl font-bold py-4">
          Confirm your Ride{" "}
        </h3>
        <h5
          onClick={() => {
            setconfirmVehiclePanel(false);
          }}
          className="relative bottom-[1rem] text-center font-medium text-2xl"
        >
          <i className="text-gray-300 ri-arrow-down-wide-fill"></i>
        </h5>
        <ConfirmVehcile
          vehicleType={vehicleType}
          start={start}
          end={end}
          fare={fare}
          createRide={createRide}
          setconfirmVehiclePanel={setconfirmVehiclePanel}
          setlookingDriverPanel={setlookingDriverPanel}
        />
      </div>

      <div
        ref={lookingDriverPanelRef}
        className="h-screen bg-white flex top-[30%] translate-y-full fixed flex-col w-full p-4"
      >
        <h3 className="absolute top-3 text-xl font-bold py-4">
          Looking for a driver{" "}
        </h3>
        <h5
          onClick={() => {
            setlookingDriverPanel(false);
          }}
          className="relative bottom-[1rem] text-center font-bold text-2xl"
        >
          <i className="text-gray-300 ri-arrow-down-wide-fill"></i>
        </h5>
        <LookingForDriver
          vehicleType={vehicleType}
          start={start}
          end={end}
          fare={fare}
        />
      </div>

      <div
        ref={waitingForDriverPanelRef}
        className="h-screen bg-white flex top-[30%] fixed flex-col translate-y-full w-full p-4"
      >
        <h3 className="absolute top-3 text-xl font-bold py-4">
          Driver's details{" "}
        </h3>
        <h5
          onClick={() => {
            setWaitingForDriverPanel(false);
          }}
          className="relative bottom-[1rem] text-center font-medium text-2xl"
        >
          <i className="text-gray-300 ri-arrow-down-wide-fill"></i>
        </h5>
        <WaitingForDriver
          ride={ride}
          vehicleType={vehicleType}
          start={start}
          end={end}
          fare={fare}
          setWaitingForDriverPanel={setWaitingForDriverPanel}
          setUserChatPanel={setUserChatPanel}
        />
      </div>

      <div
        ref={userChatPanelRef}
        className="h-screen bg-white flex top-0 fixed flex-col translate-y-full  w-full p-4 z-40"
      >
        <UserChat ride={ride} setUserChatPanel={setUserChatPanel} />
      </div>

      <div
        ref={rideCancelPanelRef}
        className="h-screen bg-white flex top-[60%] fixed flex-col translate-y-full w-full p-4"
      >
        <RideCancel setRideCancelPanel={setRideCancelPanel} />
      </div>

      {payment?.paymentStatus && (
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg">
          <h3 className="text-xl font-bold mb-2">Rate Your Experience</h3>
          <div className="flex justify-center space-x-2 rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                onClick={() => setRating(star)}
                type="radio"
                key={star}
                name="rating-1"
                className="mask mask-star"
                aria-label="1 star"
              />
            ))}
          </div>
          <textarea
            className="w-full mt-4 p-2 border rounded-md"
            placeholder="Leave a comment..."
          ></textarea>
          <button
            onClick={() => {
              giveRating();
            }}
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
