import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function CaptianDetails() {
  const captian = useSelector((state) => state.captian.captianData);
  const { messages } = useSelector((state) => state.socket);
  const [earnings, setEarnings] = useState(0);
  const [progress, setProgress] = useState(0);
  const rideId = messages[0]?._id;
  const progressRef = useRef();
  const statusRef = useRef();
  
  const updateStatus = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/captian/update-status`,
        { status: statusRef.current?.checked ? "active" : "inactive" },
        {
          withCredentials: true,
        }
      );
      console.log("Status updated:", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const rideHistory = async () => {
    if (!rideId) return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/captian/rideHistory`,
        {
          params: {
            rideId,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error fetching ride history:", error);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/captian/captian-earnings`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setEarnings(response.data.data);
      }
    })();
  }, []);

  useEffect(() => {
    if (messages[0]?._id) {
      rideHistory();
    }
  }, [messages]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/captian/captian-points`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setProgress(response.data.data.points);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (progressRef.current) {
    if (progress >= 80) {
      progressRef.current.className = "text-green-500 font-semibold";
    } else if (progress >= 50 && progress < 80) {
      progressRef.current.className = "text-orange-500 font-semibold";
    } else if (progress >= 30 && progress < 50) {
      progressRef.current.className = "text-yellow-500 font-semibold";
    } else if (progress >= 0 && progress < 30) {
      progressRef.current.className = "text-red-500 font-semibold";
    }
  }

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <div className="flex justify-center items-center gap-2">
            <img
              className="h-10 w-10 object-contain rounded-full"
              src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"
              alt="avatar"
            />
            <h3 className="font-semibold">{`${captian.firstName} ${captian.lastName}`}</h3>
          </div>

          <div className="text-start">
            <h2 className="font-semibold text-sm">₹{earnings}</h2>
            <h4 className="text-xs text-gray-500">Earned</h4>
          </div>
        </div>
        <div className="bg-gray-100 flex justify-around mt-8 py-3 rounded">
          <h2 className="font-semibold">Progress points</h2>
          <h5 ref={progressRef} className="font-medium">
            {progress}
          </h5>
        </div>
        <div className="bg-gray-100 flex items-center mt-8 py-3 rounded">
          <div className="ml-4 w-full flex justify-start">
            <h3 className="text-lg font-semibold">Status</h3>
            <div className="w-full flex justify-end items-center mr-4">
              <input
                onChange={() => {
                    updateStatus();
                }}
                ref={statusRef}
                type="checkbox"
                defaultChecked
                className="toggle toggle-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaptianDetails;
