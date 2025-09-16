import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBus() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (from && to && date) {
      navigate("/buses", { state: { from, to, date } });
    } else {
      alert("Enter all details!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Search Buses</h2>
      <input
        type="text"
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      /><br /><br />
      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      /><br /><br />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      /><br /><br />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
