import styled from 'styled-components';
import { FlexCC } from '../../../settings/styles/utils';

export const Container = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  border-radius: 50%;
  background-color: aliceblue;
  font-size: 20px;

  ${FlexCC}
  overflow: hidden;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    border-radius: 50%;
    transform: translateX(-150px);
    transition: transform 300ms ease-in-out;
  }

  &:hover {
    cursor: pointer;
    img {
      transform: translateX(0px);
    }
  }
`;
