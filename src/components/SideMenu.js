import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Profile from "../profile.png";

const SideMenuStyle = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100vh;
  flex: 1;
  width: 100%;
  background-color: white;
  box-shadow: 1px 3px 10px 2px rgba(177, 177, 177, 0.4);
  .userCard {
    display: flex;
    padding: 0;
    margin: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #006884;
    height: 37vh;
    p {
      color: #fbf9f9;
      font-size: 20px;
    }
    img {
      background-color: white;
      border-radius: 50%;
      margin: 10px;
      width: 180px;
      height: 180px;
    }
  }
  .menu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 2;
    align-items: flex-start;
    padding: 40px 0 0 0;
    background-color: white;
    a {
      width: 90%;
      box-sizing: border-box;
      margin: 5px 0 5px 10%;
      color: #053d57;
      text-decoration: none;
      background-color: #d7e5e9;
      padding: 7px 0 7px 20%;
      font-size: 17px;
      font-weight: bold;
      :hover {
        font-style: oblique;
        box-shadow: 1px 3px 10px 2px rgba(177, 177, 177, 0.4);
      }
    }
    .active-link {
    }
    .disable-link {
      pointer-events: none;
      opacity: 0.5;
    }
  }
`;

const SideMenu = () => {
  return (
    <SideMenuStyle>
      <div className="userCard">
        <img src={Profile} />
        <p>Marija Jovanoska</p>
      </div>
      <div className="menu">
        <Link to="/" className="active-link">
          Home
        </Link>
        <Link to="/" className="disable-link" onClick={e => e.preventDefault()}>
          All Employees
        </Link>
        <Link to="/" className="disable-link" onClick={e => e.preventDefault()}>
          Administrators
        </Link>
        <Link to="/report-page" className="active-link">
          Couriers
        </Link>
        <Link to="/" className="disable-link" onClick={e => e.preventDefault()}>
          IT
        </Link>
        <Link to="/" className="disable-link" onClick={e => e.preventDefault()}>
          Data Center
        </Link>
        <Link to="/" className="disable-link" onClick={e => e.preventDefault()}>
          Finances
        </Link>
      </div>
    </SideMenuStyle>
  );
};

export default SideMenu;
