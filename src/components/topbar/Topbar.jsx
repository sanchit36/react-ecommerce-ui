import React from "react";
import { useNavigate } from "react-router";
import "./topbar.css";

export default function Topbar() {
  const navigate = useNavigate();

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Ecommerce admin</span>
        </div>
        <div>
          <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Shop
          </span>
        </div>
      </div>
    </div>
  );
}
