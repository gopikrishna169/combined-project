import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SearchBus from "./components/SearchBus";
import BusList from "./components/BusList";
import Booking from "./components/Booking";
import BookedTickets from "./components/BookedTickets";

function App() {
  const [booked, setBooked] = useState([]); // store booked tickets

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<SearchBus />} />
        <Route path="/buses" element={<BusList />} />
        <Route path="/booking/:id" element={<Booking booked={booked} setBooked={setBooked} />} />
        <Route path="/booked" element={<BookedTickets booked={booked} />} />
      </Routes>
    </Router>
  );
}

export default App;
