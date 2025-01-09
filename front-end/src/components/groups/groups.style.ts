import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  border-top: 1px solid black;
  width: 150px;
  height: 100%;
  background-color: rgb(230, 230, 230);

  .groups {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 100%;
    height: calc(100% - 50px);
    overflow-y: auto;
  }

  .create-groups {
    height: 50px;
    width: 100%;
    button {
      width: 100%;
      height: 50px;
      color: black;
      cursor: pointer;
      background-color: darkgray;
    }
  }
`;
