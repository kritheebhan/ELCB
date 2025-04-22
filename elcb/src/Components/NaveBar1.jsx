import React, { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

import Notification from "../Components/Images/notification_icon.png";
import Dept from "../Components/Images/department_icon.png";
import It from "../Components/Images/it_icon.png";
import CSE from "../Components/Images/cs_icon.png";
import EEE from "../Components/Images/eee_icon.png";
import ECE from "../Components/Images/ece_icon.png";
import Mech from "../Components/Images/mech_icon.png";
import Civil from "../Components/Images/civil_icon.png";
import { Link } from "react-router-dom";




function NaveBar1() {
  const [alerts, setAlerts] = useState(() => {
    return JSON.parse(localStorage.getItem("elcbAlerts")) || [];
  });

  useEffect(() => {
    const elcbRef = ref(database, "sensor_data");

    const unsubscribe = onValue(elcbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const keys = Object.keys(data).sort();
        const latestKey = keys[keys.length - 1];

        if (latestKey && data[latestKey]?.ELCB_Fault) {
          const timestamp = data[latestKey]?.timestamp || new Date().toLocaleString();
          const newAlert = { id: latestKey, message: `⚠️ ELCB Fault Detected!`, time: timestamp };

          setAlerts((prevAlerts) => {
            const updatedAlerts = [...prevAlerts, newAlert];
            localStorage.setItem("elcbAlerts", JSON.stringify(updatedAlerts)); // Persist alerts
            return updatedAlerts;
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Remove alert when "X" button is clicked
  const removeAlert = (id) => {
    setAlerts((prevAlerts) => {
      const updatedAlerts = prevAlerts.filter((alert) => alert.id !== id);
      localStorage.setItem("elcbAlerts", JSON.stringify(updatedAlerts)); // Persist changes
      return updatedAlerts;
    });
  };

  return (
    <div className="fixed top-0 right-0 h-[96vh] w-[44vh] bg-gray-100 flex flex-col  py-6 my-3 mr-3 ">
      
     {/* 🔹 Top Section - Department List */}
<div className="flex flex-col items-start space-y-4 flex-1 px-3  border-b-2">
  <div className="w-full bg-gray-100 sticky top-0 z-10 text-left flex items-center gap-2 pb-2 mt-1">
    <img src={Dept} alt="Notification Icon" className="h-6 w-6" />
    <h2 className="text-gray-700 font-bold text-md">Department</h2>
  </div>
  <div className="flex flex-col space-y-3">
    <Link to="/Error">
  <div className="flex items-center gap-3">
  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-700">
    <img src={It} alt="Information Technology" className="h-5 w-5" />
  </div>
  <span className="text-gray-700 font-medium text-sm">Information Technology</span>
</div>
</Link>

<div className="flex flex-col space-y-3">
  <Link to="/Error">
  <div className="flex items-center gap-3">
    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-700">
      <img src={CSE} alt="Computer Science" className="h-5 w-5" />
    </div>
    <span className="text-gray-700 font-medium text-sm ">Computer Science</span>
  </div>
  </Link>

  <Link to="/Error">
  <div className="flex items-center gap-3">
    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-700">
      <img src={EEE} alt="Electrical and Electronics Engineering" className="h-5 w-5" />
    </div>
    <span className="text-gray-700 font-medium text-sm">Electrical and Electronics</span>
  </div>
  </Link>

  <Link to="Error">
  <div className="flex items-center gap-3">
    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-700">
      <img src={ECE} alt="Electronics and Communication Engineering" className="h-5 w-5" />
    </div>
    <span className="text-gray-700 font-medium text-sm">Electronics and Communication</span>
  </div>
  </Link>

  <Link to="Error">
  <div className="flex items-center gap-3">
    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-700">
      <img src={Mech} alt="Mechanical Engineering" className="h-5 w-5" />
    </div>
    <span className="text-gray-700 font-medium text-sm">Mechanical Engineering</span>
  </div>
  </Link>

  <Link to="Error">
  <div className="flex items-center gap-3">
    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-700">
      <img src={Civil} alt="Civil Engineering" className="h-5 w-5" />
    </div>
    <span className="text-gray-700 font-medium text-sm">Civil Engineering</span>
  </div>
  </Link>
</div>

  </div>
</div>


      {/* Bottom Section - Notification List */}
      <div className=" w-full flex flex-col items-center  h-[40vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-bg-grap-100">
      <div className="w-full bg-gray-100 sticky top-0 z-10 text-left flex items-center gap-2 pb-2 mt-1 px-3">
  <img src={Notification} alt="Notification Icon" className="h-6 w-6" />
  <h2 className="text-gray-700 font-bold text-md">Notifications</h2>
</div>


        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div key={alert.id} className=" text-xs font-semibold  p-3 flex items-center justify-between w-[90%] mt-2">
              <span>{alert.message} <br /> <span className="text-[10px] ">{alert.time}</span></span>
              <button onClick={() => removeAlert(alert.id)} className="ml-3 text-lg font-normal text-gray-500 hover:text-gray-300">✖</button>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-xs mt-2"> No Message</div>
        )}
      </div>
    </div>
  );
}

export default NaveBar1;
