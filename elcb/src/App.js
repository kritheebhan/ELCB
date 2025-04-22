import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navebar from './Components/Navebar';
import Dashboard from './Pages/Dashboard';
import Data from './Pages/Data';
import Notifi from './Pages/Notifi';
import Navebar1 from './Components/NaveBar1'
import Sensor from './Pages/Sensor';
import Error from './Pages/Error';


function App() {
  return (
    <Router>
      <Navebar />
      <Routes>
        <Route path="/" element={<>
          <Navebar1 />  
          <Dashboard />
        </>} />
        <Route path="/data" element={<Data />} />
        <Route path="/notifi" element={<Notifi />} />
        <Route path="/Sensor" element={<Sensor />} />
        <Route path="*" element={<Error />} />  
      </Routes>
    </Router>
  );
}

export default App;
