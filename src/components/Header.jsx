import React, { useState } from "react";
import "../css/header.css";
import { CiShoppingBasket } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../redux/slices/basketSlice";
import { setSearchTerm } from "../redux/slices/appSlice";

function Header() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { products } = useSelector((store) => store.basket);

  const searchTerm = useSelector((store) => store.app.searchTerm);

  return (
    //main div of header section
    <div className="header-container">
      <div
        className="flex-row"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        {/**the div keeps logo and brand */}
        <img src="/logo.png" className="logo" alt="#" />
        <p className="brand-text">MALLWORLD C.</p>
      </div>

      <div className="inputAndIcon" style={{ marginRight: "30px" }}>
        {/**it keeps input and icons */}
        <input
          className="search-input"
          type="text"
          placeholder="search"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />

        <div className="icon-badge-wrapper">
          <Badge
            onClick={() => dispatch(setDrawer())}
            badgeContent={products.length}
            color="warning"
            sx={{
              padding: "5px",
              "& .MuiBadge-badge": { fontSize: 10, height: 17, minWidth: 17 },
              marginTop: "5px",
            }}
          >
            <CiShoppingBasket className="icon" />
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default Header;
