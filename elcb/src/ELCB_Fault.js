// sensorListener.js
import { db } from "./firebase";
import { ref, onValue, push, set } from "firebase/database";

const sensorDataRef = ref(db, "sensor_data");
const alertsRef = ref(db, "alerts");

onValue(sensorDataRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    Object.keys(data).forEach((key) => {
      const sensor = data[key];

      if (sensor.ELCB_Fault) {
        const newAlertRef = push(alertsRef);
        set(newAlertRef, {
          id: newAlertRef.key,
          message: "⚠️ ELCB Fault Detected!",
          timestamp: sensor.timestamp,
          current: sensor.current,
          voltage: sensor.voltage,
          power: sensor.power,
        });
      }
    });
  }
});
