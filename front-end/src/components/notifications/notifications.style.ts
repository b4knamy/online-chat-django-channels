import styled, { keyframes } from 'styled-components';
import { FlexCC } from '../../settings/styles/utils';

const showIn = keyframes`
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
`;

const showOut = keyframes`
  0% {
    transform: translateX(0px);
    opacity: 1;
  }
  100% {
    transform: translateX(-100px);
    opacity: 0;
  }
`;

type containerProps = {
  $height: string;
};

export const Container = styled.div<containerProps>`
  width: 300px;
  height: auto;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  background-color: red;
  gap: 30px;
  color: black;
  position: absolute;
  left: -325px;
`;

type props = {
  $leave: boolean;
  $index: number;
};

export const NoticationContainer = styled.div<props>`
  width: 100%;
  min-height: 100px;
  max-height: 100px;
  height: 100px !important;
  background-color: #fff;
  ${FlexCC}
  position: absolute;
  top: ${({ $index }) => ($index > 0 ? `${$index * 130}px` : '0px')};
  transition: top 300ms linear;

  animation-name: ${({ $leave }) => ($leave ? showOut : showIn)};
  animation-duration: 400ms;

  i {
    position: absolute;
    right: 0;
    margin-right: 10px;
    top: 0;
    margin-top: 10px;
    cursor: pointer;
  }
`;
