import React, { useState, useEffect } from "react";
import axios from "axios";

const RecentDonor = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/donor/recentDonors")
      .then((response) => {
          setDonors(response.data);
          console.log("recent donor:",response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Recently Pledged Peoples</h2>
      {/* Legend for Avatar Status */}
      <div className="mb-4 flex gap-10">
        <div className="w-10 h-5 bg-green"></div>
        <span> (Volunter)</span>
        <div className="w-10 h-5 bg-gray-200"> </div> <span> (Not Volunter)</span>
      </div>
      {donors.map((donor, index) => (
        <div key={index} className="mb-2 flex gap-3">
          <div className={`avatar ${donor.isVolunter ? "online" : "offline"}`}>
            <div className="w-10 rounded-full">
              <img
                src={
                  donor.sex === "male"
                    ? "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
                    : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                }
                alt="Avatar"
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold"> {donor.name}</p>
            <p className="text-sm text-gray-500"> {donor.mobile}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentDonor;
