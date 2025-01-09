import styled from 'styled-components';

export const Container = styled.form`
  width: 100%;
  height: 50px;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  overflow: hidden;

  input {
    width: 100%;
    padding: 0px 100px 0px 20px;
    height: 100%;
    color: black;
    word-break: break-all;
    border: none;
    outline: none;

    &::placeholder {
      font-family:
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        'Open Sans',
        'Helvetica Neue',
        sans-serif;
    }
  }

  button {
    width: 80px;
    height: 100%;
    background-color: black;
    color: white;
    position: absolute;
    right: 0;
    cursor: pointer;
  }
`;
