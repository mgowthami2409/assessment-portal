import React from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px 20px", display: "flex", alignItems: "center" }}>
      <img src={logo} alt="Suprajit Logo" style={{ height: 50 }} />
      <h1 style={{ marginLeft: 20, color: "#2c3e50", fontWeight: 600 }}>Suprajit Portal</h1>
    </nav>
  );
}
