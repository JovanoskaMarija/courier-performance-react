import styled from "styled-components";

export const AppStyle = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  .wrapper {
    display: flex;
    align-self: flex-end;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  .routerSwitch {
    height: calc(100vh - 56.4px);
    overflow-y: scroll;
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: #f2f2f2;
    }
    &::-webkit-scrollbar {
      width: 12px;
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #349cc7;
    }
  }
`;
