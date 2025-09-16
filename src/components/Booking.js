import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Booking({ booked, setBooked }) {
  const location = useLocation();
  const navigate = useNavigate();
  const bus = location.state;

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }
    alert("Booking Successful!");
    setBooked([...booked, { ...bus, seatsBooked: selectedSeats }]);
    navigate("/booked");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Booking Confirmation</h2>
      <h3>{bus.name}</h3>
      <p>Time: {bus.time}</p>
      <p>Price per seat: ₹{bus.price}</p>
      <h4>Select Seats:</h4>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 60px)", gap: "10px", justifyContent: "center" }}>
        {[...Array(bus.seats)].map((_, i) => {
          const seatNumber = i + 1;
          const isSelected = selectedSeats.includes(seatNumber);
          return (
            <button
              key={seatNumber}
              onClick={() => handleSeatClick(seatNumber)}
              style={{
                padding: "10px",
                backgroundColor: isSelected ? "green" : "lightgray",
                border: "1px solid black",
                borderRadius: "5px",
              }}
            >
              {seatNumber}
            </button>
          );
        })}
      </div>

      <br />
      <button onClick={handleConfirm}>Confirm Booking</button>
    </div>
  );
}
