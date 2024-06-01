import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import cameraIcon from "../../assets/images/camera-icon.png";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <Link to="/userEmotionPage">
        <img src={cameraIcon} alt="Camera" className="camera-icon" />
      </Link>
    </header>
  );
};

export default Header;
