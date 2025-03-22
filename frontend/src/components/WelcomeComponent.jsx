import React from "react";
import { Link } from "react-router-dom";

function WelcomeComponent() {
  return (
    <div className="h-screen">
      <div className="bg-[url(../../welcome-image.png)] bg-cover bg-center bg-no-repeat w-full h-[75%]">
        <img
          className="w-20 h-20"
          src="https://brandlogos.net/wp-content/uploads/2021/12/uber-brandlogo.net_.png"
          alt="logo"
        />
      </div>

      <div className="h-[25%]">
        <div className="bg-white w-full p-5">
          <h1 className="text-2xl font-bold">Get Started With Uber</h1>
          <Link
            to="/login"
            className="bg-black text-white py-2 rounded mt-10 w-full flex items-center justify-center"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomeComponent;
