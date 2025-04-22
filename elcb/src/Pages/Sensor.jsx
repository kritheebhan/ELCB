import React, { useEffect, useState } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import sensor from '../Components/Images/sensor_icon.png';

function Sensor() {
  const [sensorData, setSensorData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [filters, setFilters] = useState({ department: "", floor: "", type: "" });

  useEffect(() => {
    const sensorRef = ref(database, "Devices");
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      setSensorData(data || {});
    });
  }, []);

  useEffect(() => {
    const newFilteredData = {};
    Object.entries(sensorData).forEach(([id, values]) => {
      const department = id.slice(0, 2);
      const floor = id.slice(2, 4);
      const type = id.slice(4, 5);

      const depMatch = filters.department ? department === filters.department : true;
      const floorMatch = filters.floor ? floor === filters.floor : true;
      const typeMatch = filters.type ? type === filters.type : true;

      if (depMatch && floorMatch && typeMatch) {
        newFilteredData[id] = values;
      }
    });
    setFilteredData(newFilteredData);
  }, [sensorData, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ department: "", floor: "", type: "" });
  };

  return (
    <div className="ml-24 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-5">
        <h1 className="text-2xl font-bold">Sensors</h1>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <select
          className="border rounded-md px-4 py-2"
          value={filters.department}
          onChange={(e) => handleFilterChange("department", e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="EEE">EEE</option>
          <option value="MECH">MECH</option>
          <option value="MECH">CT</option>
          <option value="CIVIL">CIVIL</option>
          <option value="ECE">ECE</option>
        </select>

        <select
          className="border rounded-md px-4 py-2"
          value={filters.floor}
          onChange={(e) => handleFilterChange("floor", e.target.value)}
        >
          <option value="">All Floors</option>
          <option value="01">Floor 01</option>
          <option value="02">Floor 02</option>
          <option value="03">Floor 03</option>
        </select>

        <select
          className="border rounded-md px-4 py-2"
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
        >
          <option value="">All Types</option>
          <option value="F">Fan</option>
          <option value="L">Light</option>
          <option value="A">AC</option>
          <option value="C">PC</option>
        </select>

        <button
          onClick={clearFilters}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl"
        >
          Clear Filters
        </button>
      </div>

      {/* Grid container for sensor cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Object.entries(filteredData).map(([deviceId, values]) => (
          <div key={deviceId} className="bg-white flex flex-col p-4 rounded-2xl shadow-lg h-[29.5vh]">
            {/* Top Section */}
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center space-x-3">
                <div className="border-2 rounded-2xl bg-indigo-600 flex items-center justify-center h-10 w-10">
                  <img src={sensor} alt="Sensor Icon" className="h-8 w-8" />
                </div>
                <h1 className="text-black font-semibold text-lg">{deviceId}</h1>
              </div>
              <div className="relative">
                <span className="absolute top-[-10px] right-0 px-2 py-1 text-white text-xs font-semibold bg-indigo-600 rounded-full">
                  {values?.Fault?.includes("NO") ? "Normal" : "Warning"}
                </span>
              </div>
            </div>

            {/* Fault Info & Power Bar */}
            <div className="mb-3 mt-2">
              <p className="text-indigo-600 text-sm mb-1">
                {values?.Fault === "NO"
                  ? "No Fault Detected"
                  : values?.Fault === "NO (No Power)"
                  ? "Warning: No power supply"
                  : values?.Fault === "Short Circuit"
                  ? "Warning: Short Circuit detected"
                  : values?.Fault === "Overload"
                  ? "Warning: Overload condition detected"
                  : values?.Fault === "Voltage Drop"
                  ? "Warning: Voltage drop observed"
                  : "Warning: Unknown Fault"}
              </p>

              <div className="w-full h-3 bg-gray-300 rounded-full relative">
                <div
                  className="h-3 bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(values?.Power || 0, 100)}%` }}
                ></div>
                <p className="absolute top-[-20px] right-0 text-black text-sm font-medium">
                  {Math.min(values?.Power || 0, 100)}%
                </p>
              </div>

              <p className="text-indigo-600 text-sm mt-2">
                {values?.Voltage === 0
                  ? "Monitor required: voltage drop observed"
                  : values?.Voltage < 200
                  ? "Warning: Low voltage detected"
                  : values?.Voltage > 250
                  ? "Warning: High voltage detected"
                  : "Voltage stable"}
              </p>
            </div>

            {/* Voltage & Current */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700 font-medium">
                Voltage: <span className="text-black font-bold">{values?.Voltage || 0} V</span>
              </p>
              <p className="text-sm text-gray-700 font-medium">
                Current: <span className="text-black font-bold">{values?.Current || 0} A</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sensor;
