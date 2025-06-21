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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        className="flex-row"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        {/**the div keeps logo and brand */}
        <img src="/src/images/logo.png" className="logo" alt="#" />
        <p className="brand-text">MALLWORLD C.</p>
      </div>

      <div className="flex-row" style={{ marginRight: "30px" }}>
        {/**it keeps input and icons */}
        <input
          className="search-input"
          type="text"
          placeholder="search something"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />

        <div style={{ display: "flex" }}>
          {/* {theme ? (
            <FaMoon
              style={{ fontSize: "16px", marginRight: "10px" }}
              onClick={changeTheme}
            />
          ) : (
            <CiLight className="icon" onClick={changeTheme} />
          )}*/}
          <Badge
            onClick={() => dispatch(setDrawer())}
            badgeContent={products.length}
            color="warning"
            sx={{
              padding: "10px",
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
