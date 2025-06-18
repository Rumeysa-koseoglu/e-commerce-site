import React, { useState } from "react";
import "../css/header.css";
import { CiShoppingBasket } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../redux/slices/basketSlice";

function Header() {
  const [theme, setTheme] = useState(false); //a state to set theme transition ('false' means the default theme (white theme))
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { products } = useSelector((store) => store.basket);

  //function to change theme
  const changeTheme = () => {
    const root = document.getElementById("root"); //we select the outermost container of the page
    setTheme(!theme); //we reverse the theme value
    if (theme) {
      //if the theme is dark we make the background dark, and the texts color white
      root.style.backgroundColor = "black";
      root.style.color = "#fff";
    } else {
      //if it is the opposite we make the background white, and the texts color black
      root.style.backgroundColor = "#fff";
      root.style.color = "black";
    }
  };

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

      <div className="flex-row">
        {/**it keeps input and icons */}
        <input
          className="search-input"
          type="text"
          placeholder="search something"
        />

        <div style={{ display: "flex", flexDirection: "bottom" }}>
          {theme ? (
            <FaMoon
              style={{ fontSize: "16px", marginRight: "10px" }}
              onClick={changeTheme}
            />
          ) : (
            <CiLight className="icon" onClick={changeTheme} />
          )}
          <Badge
            onClick={() => dispatch(setDrawer())}
            badgeContent={products.length}
            color="error"
            sx={{
              padding: "0",
              "& .MuiBadge-badge": { fontSize: 10, height: 17, minWidth: 17 },
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
