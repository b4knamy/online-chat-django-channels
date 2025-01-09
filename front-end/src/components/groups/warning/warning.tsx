import styled from 'styled-components';
import { FlexCC } from '../../../settings/styles/utils';

type props = {
  warning: string;
  cleanWarning: () => void;
};

export default function Warning({ warning, cleanWarning }: props) {
  return (
    <Container>
      <div>
        <span>{warning}</span>
        <button onClick={() => cleanWarning()}>Ok</button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;

  background-color: rgba(0, 0, 0, 0.4);

  ${FlexCC}

  div {
    background-color: #fff;
    color: black;
    width: 400px;
    height: 150px;

    ${FlexCC}

    flex-direction: column;
    gap: 30px;

    button {
      width: 100px;
      height: 40px;
    }
  }
`;
