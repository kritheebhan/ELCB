import React, { useEffect, useState } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar, YAxis } from 'recharts';

import Heart from '../Components/Images/heart_icon.png';
import Fault from '../Components/Images/fault_icon.png';
import Alert from  '../Components/Images/Alert_icon.png';
import Good from  '../Components/Images/good_icon.png';
import sensor from '../Components/Images/sensor_icon.png';



export default function Dashboard() {
  const [sensorDataList, setSensorDataList] = useState([]);
  const [latestData, setLatestData] = useState({ voltage: 'N/A', current: 'N/A', power: 'N/A' });
  const [elcbStatus, setElcbStatus] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('current');
  const [faultCount, setFaultCount] = useState(0);
  const [clearCount, setClearCount] = useState(0);

  useEffect(() => {
    // Fetch Sensor Data
    const sensorRef = ref(database, 'sensor_data');
    onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dataList = Object.entries(data).map(([id, values]) => ({
          id,
          timestamp: new Date(values.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
          voltage: values.voltage || 0,
          current: values.current || 0,
          power: values.power || 0,
          elcbStatus: values.ELCB_Fault === false
        }));

        dataList.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        const recentData = dataList.slice(-10);
        setSensorDataList(recentData);

        const lastEntry = recentData[recentData.length - 1];
        if (lastEntry) {
          setLatestData({
            voltage: lastEntry.voltage,
            current: lastEntry.current,
            power: lastEntry.power
          });
          setElcbStatus(lastEntry.elcbStatus);
        }
      }
    });

   // Fetch Fault Alerts Count and Cleared Alerts Count
const countsRef = ref(database, 'counts');
onValue(countsRef, (snapshot) => {
  if (snapshot.exists()) {
    const countsData = snapshot.val();
    setFaultCount(countsData.faultCount || 0);
    setClearCount(countsData.solvedCount || 0);
  } else {
    setFaultCount(0);
    setClearCount(0);
  }
});


  }, []);

  

  // Bar Chart Data
  const barChartData = [
    { name: "Faults", value: faultCount },
    { name: "Cleared", value: clearCount }
  ];
  return (
    <div className='ml-24 p-6 '>
      {/* Dashboard Header */}
      <div className='flex items-center justify-between'>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      
      </div>

      <div className='flex flex-wrap gap-5 mt-4'>
        {/* ELCB Monitoring Card */}
        <div className='h-[55vh] w-[40rem] bg-indigo-500 flex flex-col items-center py-6 rounded-2xl shadow-lg'>
          <div className="w-full flex justify-between px-6">
            <h1 className="text-white font-semibold text-xl">ELCB</h1>
            <select className="bg-white text-indigo-600 font-medium px-3 py-1 rounded-lg shadow-sm" 
              onChange={(e) => setSelectedMetric(e.target.value)} value={selectedMetric}>
              <option value="current">Current (A)</option>
              <option value="voltage">Voltage (V)</option>
              <option value="power">Power (W)</option>
            </select>
          </div>

          {/* Line Chart */}
          <div className="w-[36rem] h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorDataList}>
                <XAxis dataKey="timestamp" stroke="#FFFFFF" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#333', color: '#FFFFFF' }} />
                {selectedMetric === "current" && <Line type="monotone" dataKey="current" stroke="#FF0000" strokeWidth={2} />}
                {selectedMetric === "voltage" && <Line type="monotone" dataKey="voltage" stroke="#000000" strokeWidth={2} />}
                {selectedMetric === "power" && <Line type="monotone" dataKey="power" stroke="#FFFFFF" strokeWidth={2} />}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Sensor Readings */}
          <div className="flex gap-6 mt-auto pt-2">
            <div className='h-24 w-44 bg-indigo-400 rounded-lg flex flex-col items-center justify-center text-white shadow-md'>
              <p className="text-sm font-medium">Voltage</p>
              <p className="text-2xl font-bold">{latestData.voltage}V</p>
            </div>
            <div className='h-24 w-44 bg-indigo-400 rounded-lg flex flex-col items-center justify-center text-white shadow-md'>
              <p className="text-sm font-medium">Current</p>
              <p className="text-2xl font-bold">{latestData.current}A</p>
            </div>
            <div className='h-24 w-44 bg-indigo-400 rounded-lg flex flex-col items-center justify-center text-white shadow-md'>
              <p className="text-sm font-medium">Power</p>
              <p className="text-2xl font-bold">{latestData.power}W</p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col gap-3">
          {/* Condition Card */}
          <div className="h-[20vh] w-[22rem] bg-indigo-400 flex flex-col p-4 rounded-2xl shadow-lg relative">
  <div className="flex items-center space-x-3">
    <div className="border-2 rounded-xl bg-indigo-600 border-indigo-600 p-1">
      <img src={Heart} alt="Heart Icon" className="h-8 w-8" />
    </div>
    <h1 className="text-white font-semibold text-xl">Condition</h1>
  </div>

  {/* Status Image (Good or Alert) */}
  <img 
    src={elcbStatus ? Good : Alert} 
    alt={elcbStatus ? "Good Condition" : "Alert Condition"} 
    className="absolute top-4 right-4 h-8 w-8"
  />

  <div className="absolute bottom-5 left-8 text-white text-2xl font-bold">
    {elcbStatus ? "Good" : "Fault"}
  </div>
</div>


          {/* Fault Statistics with Bar Chart */}
          <div className="h-[33.5vh] w-[22rem] bg-indigo-400 flex flex-col justify-center py-6 rounded-2xl shadow-lg pl-5">
          <div className="flex items-center space-x-3 mt-3">
              <div className="border-2 rounded-xl bg-indigo-600 border-indigo-600 p-1">
                <img src={Fault} alt="Heart Icon" className="h-8 w-8" />
              </div>
              <h1 className="text-white font-semibold text-xl">Fault Statistics</h1>
            </div>
          <div className='ml-auto mr-8 '>
          <p className="text-white text-xs font-semibold">Total Faults: <span className="font-bold">{faultCount}</span></p>
          <p className="text-white text-xs font-semibold">Faults Cleared: <span className="font-bold">{clearCount}</span></p>
          </div>
          <ResponsiveContainer width="90%" height={150}>
            <BarChart data={barChartData} layout="vertical">
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" stroke="#EEEDEB" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', color: '#000000' }} 
                itemStyle={{ color: '#000000' }} />
            <Bar dataKey="value" fill="#EEEDEB" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </div>
      </div>
      {/* Extra 3 Boxes */}
<div className="flex gap-5 mt-5 ">
<div className="h-[29.5vh] w-[44vh] bg-white flex flex-col p-4 rounded-2xl shadow-lg">
  {/* Top Section - ID & Sensor Reading */}
  <div className="flex justify-between items-center mb-10">
    {/* Left: Icon & ID */}
    <div className="flex items-center space-x-3">
      <div className="border-2 rounded-2xl bg-indigo-600 flex items-center justify-center h-10 w-10">
        <img src={sensor} alt="Sensor Icon" className="h-8 w-8" />
      </div>
      <h1 className="text-black font-semibold text-lg">IT01F002</h1>
    </div>

    {/* Right: Sensor Condition */}
    <div className="relative">
      <span className="absolute top-[-10px] right-0 px-2 py-1 text-white text-xs font-semibold bg-indigo-600 rounded-full">
        Warning
      </span>
    </div>
  </div>

  {/* Load Bar Section */}
  <div className="mb-3 mt-2">
    <p className="text-indigo-600 text-sm mb-1">Warning: Light fault detected</p>

    {/* Progress Bar */}
    <div className="w-full h-3 bg-gray-300 rounded-full relative">
      <div
        className="h-3 bg-indigo-600 rounded-full transition-all duration-300"
        style={{ width: "45%" }}
      ></div>

      {/* Sensor Reading Near Load Bar (Top-Right) */}
      <p className="absolute top-[-20px] right-0 text-black text-sm font-medium">
        45%
      </p>
    </div>

    <p className="text-indigo-600 text-sm mt-2">Monitor required: voltage drop observed</p>
  </div>

  {/* Voltage & Current Display */}
  <div className="flex justify-between items-center">
    <p className="text-sm text-gray-700 font-medium">
      Voltage: <span className="text-black font-bold">212 V</span>
    </p>
    <p className="text-sm text-gray-700 font-medium">
      Current: <span className="text-black font-bold">5.6 A</span>
    </p>
  </div>
</div>


<div className="h-[29.5vh] w-[44vh] bg-white flex justify-between p-4 rounded-2xl shadow-lg">
  <div className="flex space-x-3 ">
    <div className="border-2 rounded-2xl bg-indigo-600  flex items-center justify-center h-10 w-10">
      <img src={sensor} alt="Good Icon" className="h-8 w-8 " />
    </div>
    <h1 className="text-black font-semibold text-lg mt-1">IT00F005</h1>
  </div>
 
</div>

<div className="h-[29.5vh] w-[44vh] bg-white flex justify-between p-4 rounded-2xl shadow-lg">
  <div className="flex space-x-3 ">
    <div className="border-2 rounded-2xl bg-indigo-600  flex items-center justify-center h-10 w-10">
      <img src={sensor} alt="Good Icon" className="h-8 w-8 " />
    </div>
    <h1 className="text-black font-semibold text-lg mt-1">IT02L001</h1>
  </div>
  <p className="text-black text-xl font-bold">75%</p>
</div>
</div>

    </div>
  );
}
