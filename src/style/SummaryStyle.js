import styled from "styled-components";

export const SummaryStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  .header {
    color: #053d57;
    font-size: 19px;
    font-weight: 700;
    font-style: oblique;
  };
  .container {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 7%;
  };
  .card {
    width: 250px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    background-color: #d7e5e9;
    box-shadow: 1px 3px 10px 2px rgba(177, 177, 177, 0.4);
    padding: 20px;
  };
  .description {
    text-indent: 30px;
    color: #053d57;
    font-size: 16px;
    font-weight: 600;
    font-style: oblique;
  };
  .courier {
    color: #053d57;
    font-size: 19px;
    font-weight: 900;
    font-style: oblique;
    text-shadow: 3px 3px 5px rgba(177, 177, 177, 0.8);
  };
`;
