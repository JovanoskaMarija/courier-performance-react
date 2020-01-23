import styled from "styled-components";

export const DetailsStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  .header {
    color: #053d57;
    font-size: 19px;
    font-weight: 700;
    font-style: oblique;
  };
  .container {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    margin-bottom: 5%;
  }
  .description {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border-radius: 7px;
    padding: 0;
    margin-bottom: 5%;
    p {
      color: #053d57;
      font-size: 16px;
      font-weight: 600;
      padding: 0;
    }
  }
  .card {
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 7px;
    background-color: #d7e5e9;
    box-shadow: 1px 3px 10px 2px rgba(177, 177, 177, 0.4);
    padding: 20px;
    margin: 0 20px;
  }
  .card-description {
    p {
      color: #053d57;
      font-size: 15px;
      font-weight: 400;
      /* font-style: oblique; */
    };
  }
    .data{
      font-size: 17px;
      font-weight: 500;
      font-style: oblique;
    }
`;
