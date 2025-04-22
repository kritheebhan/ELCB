import React from "react";
import { Link, useLocation } from "react-router-dom";
import Home from "./Images/home_icon.png";
import Database from "./Images/database_icon.png";
import Notifi from "./Images/setting_icon.png";
import Logout from "./Images/logout_icon.png";
import Sensor from "./Images/sensor_icon.png";


function Navbar() {
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: Home, alt: "Home" },
    { path: "/data", icon: Database, alt: "Database" },
    { path: "/Notifi", icon: Notifi, alt: "Notification" },
    { path: "/Sensor", icon: Sensor, alt: "Sensor" },
  ];

  return (
    <div className="h-[96vh] w-20 bg-indigo-500 flex flex-col items-center py-6 
                    ml-3 my-3 rounded-2xl shadow-lg fixed top-0 left-0">
      
      {/* Top Icons */}
      <div className="flex flex-col gap-7 flex-grow">
        {menuItems.map((item) => (
          <Link to={item.path} key={item.path}>
            <div
              className={`border-2 rounded-xl p-3 cursor-pointer transition-all 
                          ${
                            location.pathname === item.path
                                 ? "bg-indigo-900 border-indigo-900"
                              : "bg-indigo-400 border-indigo-400"
                          }`}
            >
              <img src={item.icon} alt={item.alt} className="h- w-5" />
            </div>
          </Link>
        ))}
      </div>

      {/* Logout Icon at Bottom */}
      <div className="mb-6">
        <Link to="/logout">
          <div
            className={`border-2 rounded-xl p-3 cursor-pointer transition-all 
                        ${
                          location.pathname === "/logout"
                            ? "bg-indigo-900 border-indigo-900"
                            : "bg-indigo-400 border-indigo-400"
                        }`}
          >
            <img src={Logout} alt="Logout" className="h-5 w-5" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
