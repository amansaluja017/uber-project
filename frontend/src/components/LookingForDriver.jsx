import React from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function LookingForDriver(props) {
  const vehicleType = useRef(null);

  React.useEffect(() => {
    // Import GSAP

    // Animation for vehicle image
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(vehicleType.current, {
      y: -10,
      duration: 0.8,
      ease: "power1.inOut",
    }).to(vehicleType.current, {
      y: 0,
      duration: 0.8,
      ease: "power1.inOut",
    });

    // Set vehicle image based on type
    if (props.vehicleType === "motorbike") {
      vehicleType.current.src =
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png";
      vehicleType.current.alt = "motorbike";
    } else if (props.vehicleType === "auto") {
      vehicleType.current.src =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFabRnJZ8deGXJSKA1QjN45920WytRrdFsA&s";
      vehicleType.current.alt = "auto";
    } else {
      vehicleType.current.src = "https://www.jaipurcitycab.in/images/car2.png";
      vehicleType.current.alt = "car";
    }
  }, [props.vehicleType]);

  return (
    <div>
      <div className="flex items-center justify-center">
        <img
          ref={vehicleType}
          className="h-[10rem] w-[10rem] object-contain"
          src="https://www.jaipurcitycab.in/images/car2.png"
          alt="car"
        />
      </div>
      <div className="h-[1px] absolute  bg-gray-200 w-full"></div>
      <div>
        <div className="flex items-center mt-4 mb-3">
          <div>
            <i className="ri-map-pin-fill"></i>
          </div>
          <div className="ml-3">
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
    </div>
  );
}

export default LookingForDriver;
