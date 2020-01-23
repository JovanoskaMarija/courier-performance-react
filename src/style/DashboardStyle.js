import styled from "styled-components";

export const DashboardStyle = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;
export const Card = styled.div`
  width: 350px;
  height: 150px;
  display: flex;
  background-color: #97bcc7;
  margin: 30px;
  box-shadow: 1px 5px 10px 2px rgba(177, 177, 177, 0.4);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  ${props => (props.disabled ? "opacity: 0.4" : "opacity: 1")};
  p {
    font-size: 25px;
    font-weight: bold;
    color: #053d57;
  }
  :hover {
    background-color: #006884;
    p {
      color: #fbf9f9;
    }
  }
`;
