import React from "react";

export default function BookedTickets({ booked }) {
  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>My Booked Tickets</h2>
      {booked.length === 0 ? (
        <p>No tickets booked yet!</p>
      ) : (
        booked.map((bus, index) => (
          <div key={index} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <h3>{bus.name}</h3>
            <p>Time: {bus.time}</p>
            <p>Price per seat: ₹{bus.price}</p>
            <p>Seats Booked: {bus.seatsBooked.join(", ")}</p>
            <p>Total Price: ₹{bus.price * bus.seatsBooked.length}</p>
          </div>
        ))
      )}
    </div>
  );
}
