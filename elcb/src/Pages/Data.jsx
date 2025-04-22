import React, { useEffect, useState } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';

export default function Data() {
  const [sensorDataList, setSensorDataList] = useState([]);

  useEffect(() => {
    const sensorRef = ref(database, 'sensor_data'); // ✅ Correct path

    onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        console.log("✅ Data Retrieved:", snapshot.val()); // Debugging log
        const data = snapshot.val();
        const dataList = Object.entries(data).map(([id, values]) => ({ id, ...values }));

        // ✅ Sort by latest timestamp (reverse the list)
        setSensorDataList(dataList.reverse()); 
      } else {
        console.log("❌ No data available");
        setSensorDataList([]);
      }
    }, (error) => {
      console.error("🔥 Firebase Error:", error);
    });

  }, []);

  return (
    <div className="ml-24 p-6">
      <h1 className="text-2xl font-bold">Sensor Data</h1>
      {sensorDataList.length === 0 ? (
        <p className="text-red-500">⚠ No data available</p>
      ) : (
        <table className="User-table table-auto w-full border-collapse border border-slate-300 mt-4">
          <thead>
            <tr className="bg-indigo-500 text-white">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Timestamp</th>
              <th className="border border-gray-300 px-4 py-2">Voltage (V)</th>
              <th className="border border-gray-300 px-4 py-2">Current (A)</th>
              <th className="border border-gray-300 px-4 py-2">Power (W)</th>
              <th className="border border-gray-300 px-4 py-2">Frequency (Hz)</th>
              <th className="border border-gray-300 px-4 py-2">Power Factor</th>
              <th className="border border-gray-300 px-4 py-2">ELCB Fault</th>
            </tr>
          </thead>
          <tbody>
            {sensorDataList.map((sensor, index) => (
              <tr key={sensor.id} className="border border-slate-300 text-center">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{sensor.timestamp}</td>
                <td className="border border-gray-300 px-4 py-2">{sensor.voltage}</td>
                <td className="border border-gray-300 px-4 py-2">{sensor.current}</td>
                <td className="border border-gray-300 px-4 py-2">{sensor.power}</td>
                <td className="border border-gray-300 px-4 py-2">{sensor.frequency}</td>
                <td className="border border-gray-300 px-4 py-2">{sensor.powerFactor}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {sensor.ELCB_Fault ? '⚠️ Fault' : '✅ Normal'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
