import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: white;
  box-shadow: 1px 3px 10px 2px rgba(177, 177, 177, 0.4);
  p {
    align-self: flex-end;
    margin: 15px;
    margin-right: 50px;
    color: #053d57;
    font-size: 20px;
    font-weight: bold;
    font-style: oblique;
    :hover {
      text-shadow: 3px 3px 5px rgba(177, 177, 177, 0.8);
    }
  }
`;

const Header = () => {
  return (  
    <HeaderStyle>
      <Link to="/">
        {" "}
        <p>Brza Poshta</p>{" "}
      </Link>
    </HeaderStyle>
  );
};

export default Header;
