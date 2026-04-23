import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import FormPage from "./pages/FormPage";
import ReservationsPage from "./pages/ReservationsPage";

import "./App.css";

function App() {
  const [message, setMessage] = useState("Loading...");
  const [users, setUsers] = useState([]);

  // 🔥 UI STATE
  const [showForm, setShowForm] = useState(false);
  const [showReservations, setShowReservations] = useState(false);

  // 🔗 FETCH BACKEND DATA
  useEffect(() => {
    async function fetchData() {
      try {
        const healthRes = await fetch("http://localhost:5000/api/health");
        const healthData = await healthRes.json();
        setMessage(healthData.message);

        const usersRes = await fetch("http://localhost:5000/api/users");
        const usersData = await usersRes.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Fetch failed:", error);
        setMessage("Failed to connect to API");
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">

      {/* ✅ NAVBAR (UPDATED HERE) */}
      <Navbar
        onReserveClick={() => {
          setShowForm(true);
          setShowReservations(false);
        }}
        onViewReservations={(value = true) => {
          setShowReservations(value); // 👈 THIS FIX
          setShowForm(false);
        }}
      />

      {/* ✅ MAIN CONTENT SWITCH */}
      {showReservations ? (
        <ReservationsPage />
      ) : (
        <>
          <Hero />
          <Menu />
        </>
      )}

    

      {/* ✅ MODAL FORM */}
      {showForm && (
        <div className="overlay">
          <div className="modal">

            <button
              onClick={() => setShowForm(false)}
              className="close-btn"
            >
              ✖
            </button>

            <FormPage />
          </div>
        </div>
      )}

      {/* ✅ FOOTER */}
      <Footer />

    

    </div>
  );
}

export default App;