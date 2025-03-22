import React from "react";
import { Button } from "../components/index";
import { useNavigate } from "react-router-dom";

function PaymentReceive() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="animate-ping rounded-full bg-green-400 border-white border-2 h-12 w-12 flex items-center justify-center text-white">
          <i className="text-3xl font-bold ri-check-line"></i>
        </div>
        <h1 className="text-xl text-white font-extrabold">
          Payment Received successfully!
        </h1>

        <div>
          <Button
            onClick={() => {
              navigate("/captian-home");
            }}
            className="bg-green-500 border-2 text-sm rounded-md px-2 animate-pulse"
          >
            Continue to home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PaymentReceive;
