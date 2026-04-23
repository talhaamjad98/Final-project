import React from "react";

const Navbar = ({ onReserveClick, onViewReservations }) => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.4rem 5%",
        position: "absolute",
        width: "100%",
        zIndex: 100,
        borderBottom: "1px solid rgba(180,140,80,0.12)",
        boxSizing: "border-box",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.2em",
          color: "#c8a96e",
          textTransform: "uppercase",
        }}
      >
        Aura Coffee
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        {/* HOME */}
        <button
          onClick={() => onViewReservations(false)}
          style={{
            cursor: "pointer",
            background: "none",
            border: "none",
            color: "#a89070",
            fontSize: "13px",
            letterSpacing: "0.04em",
            padding: 0,
          }}
        >
          Home
        </button>

        {/* RESERVATIONS PAGE */}
        <button
          onClick={onViewReservations}
          style={{
            cursor: "pointer",
            background: "none",
            border: "none",
            color: "#a89070",
            fontSize: "13px",
            letterSpacing: "0.04em",
            padding: 0,
          }}
        >
          Reservations
        </button>

        {/* DIVIDER */}
        <div style={{ width: "1px", height: "14px", background: "rgba(180,140,80,0.2)" }} />

        

        {/* DIVIDER */}
        <div style={{ width: "1px", height: "14px", background: "rgba(180,140,80,0.2)" }} />

        {/* RESERVE FORM */}
        <button
          onClick={onReserveClick}
          style={{
            cursor: "pointer",
            background: "transparent",
            border: "1px solid #c8a96e",
            color: "#c8a96e",
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "7px 18px",
            borderRadius: "4px",
          }}
        >
          Reserve
        </button>
      </div>
    </nav>
  );
};

export default Navbar;