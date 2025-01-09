import styled from 'styled-components';
import { FlexCC } from '../../../settings/styles/utils';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.4);

  ${FlexCC}

  form {
    position: relative;
    background-color: #fff;
    width: 350px;
    height: 150px;

    ${FlexCC}
    flex-direction: column;
    gap: 20px;

    input {
      background-color: darkgray;
      width: 80%;
      height: 30px;
      padding-left: 10px;
    }
    label {
      font-size: 15px;
      color: black;
    }

    .create-options {
      display: flex;
      flex-direction: row;
      gap: 10px;
      button {
        width: 120px !important;
        height: 30px !important;
      }
    }
  }
`;
