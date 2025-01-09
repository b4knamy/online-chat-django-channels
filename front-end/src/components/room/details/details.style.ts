import styled from 'styled-components';
import { FlexCC } from '../../../settings/styles/utils';

export const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  position: absolute;
  top: 0;
  z-index: 1;
  ${FlexCC}

  .room-settings {
    position: absolute;
    right: 0;
    height: 100%;
    width: 80px;
    ${FlexCC}
    cursor: pointer;
    &:hover {
      background-color: white;
      i {
        color: black;
      }

      transition: background-color 300ms linear;
    }
    i {
      transform: scale(1.5);
    }
  }

  .r-s-options {
    width: 100%;
    height: 50px;
    position: absolute;
    background-color: #fff;
    transform: translateY(50px);
    display: flex;
    justify-content: start;
    align-items: center;
    padding-left: 20px;
    overflow: hidden;
    color: black;
    transition: max-height 300ms linear;
  }
`;
