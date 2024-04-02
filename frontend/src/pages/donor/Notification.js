import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";

const ENDPOINT = "http://localhost:4000"; // Your server endpoint
const socket = socketIOClient(ENDPOINT);

const SingleNotification = ({ notification, onNotificationClick, clicked }) => {
  return (
    <div
      className={`flex items-center p-2 cursor-pointer ${
        clicked ? "" : "border-l-4 border-blue-500"
      }`}
      onClick={() => onNotificationClick(notification)}
    >
      <div className="text-gray-600">{notification}</div>
    </div>
  );
};

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [clickedNotification, setClickedNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("newDonorNotification", (data) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        data.donor.name,
      ]);
      setCount(data.count);
    });

    // return () => {
    //   socket.off("newDonorNotification");
    // };
  }, []);

  const handleNotificationClick = (notification) => {
    socket.emit("resetNotificationCount");
    setCount((prevCount) => prevCount - 1);
    setClickedNotification(notification);

    navigate("/adminDashboard/donorList");
  };

  return (
    <div className="container mx-auto mt-8">
      {count > 0 ? (
        notifications.map((notification, index) => (
          <SingleNotification
            key={index}
            notification={notification}
            clicked={clickedNotification === notification}
            onNotificationClick={handleNotificationClick}
          />
        ))
      ) : (
        <h2>You have no notifications</h2>
      )}
    </div>
  );
};

export default Notification;
