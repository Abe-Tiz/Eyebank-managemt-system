import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Link, useNavigate } from "react-router-dom";

const SingleNotification = ({ notification, onNotificationClick, clicked }) => {
    
  return (
    <div
      className={`flex items-center p-2 cursor-pointer ${
        clicked ? "" : "border-l-4 border-blue-500"
      }`}
      onClick={() => onNotificationClick(notification)}
    >
      <div className="text-gray-600">{notification.donorId.name}  Registered Please Activate.</div>
    </div>
  );
};


const Notification = ({ notifications, newDonorCount }) => {

  const [clickedNotification, setClickedNotification] = useState(null);
  const navigate = useNavigate();

  const handleNotificationClick = (notification) => {
    setClickedNotification(notification);

    navigate("/labtechnicaldashboard/donorList");
  };

  return (
    <div className="container mx-auto mt-8">
      {newDonorCount > 0 ? (
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

      <div className="btn btn-secondary rounded-lg">
        <Link to="/labtechnicaldashboard/donorList">Activate</Link>
      </div>
    </div>
  );
};

export default Notification;
