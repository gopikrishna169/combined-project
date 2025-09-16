import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BusList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to, date } = location.state || {};

  const buses = [
    { id: 1, name: "KSRTC", time: "10:00 AM", price: 500, seats: 10 },
    { id: 2, name: "SRS Travels", time: "2:00 PM", price: 700, seats: 15 },
    { id: 3, name: "VRL", time: "9:00 PM", price: 800, seats: 20 },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Buses from {from} to {to} on {date}</h2>
      {buses.map((bus) => (
        <div key={bus.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <h3>{bus.name}</h3>
          <p>Departure: {bus.time}</p>
          <p>Price per seat: ₹{bus.price}</p>
          <p>Total seats: {bus.seats}</p>
          <button onClick={() => navigate(`/booking/${bus.id}`, { state: bus })}>
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}
