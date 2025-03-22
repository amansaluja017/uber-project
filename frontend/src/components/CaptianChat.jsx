import React, { useEffect, useRef, useState } from "react";
import { Input } from ".";
import { ChevronLeft, SendHorizontal } from "lucide-react";
import {
  connectSocket,
  disconnectSocket,
  sendMessage,
} from "../store/SocketSlice";
import { useDispatch } from "react-redux";
import socket from "../services/Socket.service";

function CaptianChat(props) {
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    connectSocket(dispatch);

    socket.on("user-message", (message) => {
      setMessages((prev) => {
        if (!prev.some((m) => m.text === message?.message)) {
          return [
            ...prev,
            {
              text: message?.message,
              type: "received",
              timestamp: new Date().toISOString(),
            },
          ];
        }
        return prev;
      });
    });

    return () => {
      socket.off("user-message");
      disconnectSocket(dispatch);
    };
  }, [dispatch]);

  const submit = (e) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      const value = inputRef.current?.value;
      setMessages((prev) => [
        ...prev,
        {
          text: value,
          type: "sent",
          timestamp: new Date().toISOString(),
        },
      ]);
      sendMessage({
        event: "captian-chat",
        data: { message: value, userId: props.ride?.user?.socketId },
      });
      inputRef.current.value = "";
    }
  };

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div
        onClick={() => {
          props.setCaptianChatPanel(false);
        }}
        className="absolute p-3"
      >
        <ChevronLeft className="font-bold" />
      </div>
      <div className="flex items-center justify-between p-4 bg-white shadow-md">
        <img
          className="w-12 h-12 mt-5"
          src="https://brandlogos.net/wp-content/uploads/2021/12/uber-brandlogo.net_.png"
          alt="logo"
        />
        <h1 className="text-xl font-bold">Chat Box</h1>
      </div>

      <div className="flex items-center p-4 bg-white shadow-sm">
        <img
          className="h-12 w-12 object-cover rounded-full"
          src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"
          alt="avatar"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">
            {`${props?.ride?.user?.firstName}` +
              " " +
              `${props?.ride?.user?.lastName}`}
          </h3>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sortedMessages.map((message, i) => (
          <div
            key={i}
            className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`${
                message.type === "sent"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              } p-3 rounded-lg max-w-xs`}
            >
              <div>{message.text}</div>
              <div className="text-xs opacity-75 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white shadow-md">
        <form className="relative flex items-center">
          <Input
            ref={inputRef}
            placeholder="Type your message..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SendHorizontal
            onClick={(e) => {
              submit(e);
            }}
            className="absolute right-4 text-blue-500 cursor-pointer"
            size={24}
          />
        </form>
      </div>
    </div>
  );
}

export default CaptianChat;
