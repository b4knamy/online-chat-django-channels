import styled from 'styled-components';
import { FlexCC } from '../../settings/styles/utils';

export const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: rgb(230, 230, 230);
  color: rgb(30, 30, 30);
  position: relative;

  .available-users {
    width: max-content;
    height: 100%;
    position: absolute;
    margin-left: 10px;
    left: 0;
    ${FlexCC}
    flex-direction: row;
    gap: 5px;

    .green-circle {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: green;
    }
  }
  .current-user {
    ${FlexCC};
    position: absolute;
    right: 0;
    margin-right: 10px;
    width: max-content;
    height: 100%;

    gap: 30px;
    .icon-logout {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      position: relative;
      cursor: pointer;
      width: 20px;
      height: 100%;

      transition: all 300ms linear;
      &:hover {
        color: darkcyan;
        width: 70px;
        transition: width 300ms linear;
        i {
          position: relative;
        }
        span {
          display: flex;
        }
      }
      i {
        transform: scale(1.5);

        z-index: 2;
      }
      span {
        display: none;
      }
    }

    padding-right: 10px;
  }
`;
