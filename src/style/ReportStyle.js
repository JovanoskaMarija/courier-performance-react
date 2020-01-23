import styled from "styled-components";

export const ReportStyle = styled.div`
  box-sizing: border-box;
  margin: 2% 4%;
  display: flex;
  flex-direction: column;
  .seeSummary {
    align-self: flex-end;
    background-color: #006884;
    padding: 0 10px;
    border-radius: 6px;
    a {
      text-decoration: none;
      p {
        text-transform: uppercase;
        font-weight: 500;
        font-size: 18;
        color: #fbf9f9;
      }
    }
    :hover {
      box-shadow: 1px 3px 10px 2px rgba(177, 177, 177, 0.4);
    }
  }
  .disabled {
    align-self: flex-end;
    background-color: #006884;
    padding: 0 10px;
    opacity: 0.5;
    border-radius: 6px;
    a {
      text-decoration: none;
      p {
        text-transform: uppercase;
        font-weight: 500;
        font-size: 18;
        opacity: 0.5;
        color: #fbf9f9;
        :hover {
          pointer-events: none;
        }
      }
    }
    :hover {
      pointer-events: none;
      box-shadow: 1px 3px 10px 2px rgba(177, 177, 177, 0.4);
    }
  }
  .datePicersSection {
    background-color: #d7e5e9;
    width: 100%;
    margin-top: 2%;
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .inputs {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    max-width: 100%;
  }
  .dataTable {
    margin-top: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
