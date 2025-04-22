import React, { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { ref, onValue, set } from "firebase/database";

export default function Notifi() {
  const [faults, setFaults] = useState([]);
  const [solved, setSolved] = useState([]);

  useEffect(() => {
    const sensorRef = ref(database, "sensor_data");
    const countRef = ref(database, "counts");

    onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dataList = Object.entries(data).map(([id, values]) => ({
          id,
          ...values,
        }));

        const faultList = dataList.filter((item) => item.ELCB_Fault === true);
        const solvedList = dataList.filter((item) => item.ELCB_Fault === false);
        
        setFaults(faultList);
        setSolved(solvedList);

        // Save counts to database
        set(countRef, {
          faultCount: faultList.length,
          solvedCount: solvedList.length,
        });
      }
    });
  }, []);

  // Move Fault to Solved
  const moveToSolved = (item) => {
    set(ref(database, `sensor_data/${item.id}`), {
      ...item,
      ELCB_Fault: false,
    });
  };

  // Move Solved to Fault
  const moveToFault = (item) => {
    set(ref(database, `sensor_data/${item.id}`), {
      ...item,
      ELCB_Fault: true,
    });
  };

  return (
    <div className="ml-24 p-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Fault Section */}
        <div className="p-4 rounded-lg shadow-md border bg-white">
          <div className="p-4 rounded-xl shadow-md bg-indigo-500 sticky top-0 z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Faults Detected</h2>
              <span className="bg-indigo-700 text-white px-3 py-1 rounded-full font-extrabold text-sm">
                {faults.length}
              </span>
            </div>
          </div>

          <div className="max-h-[585px] overflow-y-auto mt-2">
            {faults.length === 0 ? (
              <p className="text-gray-500">No faults detected</p>
            ) : (
              <ul>
                {faults.map((item) => (
                  <li key={item.id} className="mb-3 border-b pb-2">
                    <h3 className="text-lg font-bold">ELCB Fault</h3>
                    <p> Voltage: {item.voltage}V</p>
                    <p> Current: {item.current}A</p>
                    <p> Power: {item.power}W</p>
                    <p>🕒 {item.timestamp}</p>
                    <button
                      onClick={() => moveToSolved(item)}
                      className="mt-2 bg-indigo-400 hover:bg-indigo-700 text-white px-3 py-1 rounded-md"
                    >
                      Move to Solved
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Solved Section */}
        <div className="p-4 rounded-lg shadow-md border bg-white">
          <div className="p-4 rounded-xl shadow-md bg-indigo-500 sticky top-0 z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Solved Issues</h2>
              <span className="bg-indigo-700  text-white px-3 py-1 rounded-full font-extrabold text-sm">
                {solved.length}
              </span>
            </div>
          </div>

          <div className="max-h-[585px] overflow-y-auto mt-2">
            {solved.length === 0 ? (
              <p className="text-gray-500">No solved issues</p>
            ) : (
              <ul>
                {solved.map((item) => (
                  <li key={item.id} className="mb-3 border-b pb-2">
                    <h3 className="text-lg font-bold">ELCB Fault (Resolved)</h3>
                    <p> Voltage: {item.voltage}V</p>
                    <p> Current: {item.current}A</p>
                    <p> Power: {item.power}W</p>
                    <p>🕒 Resolved at: {item.timestamp}</p>
                    <button
                      onClick={() => moveToFault(item)}
                      className="mt-2 bg-indigo-400 hover:bg-indigo-700 text-white px-3 py-1 rounded-md"
                    >
                      Move to Fault
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
