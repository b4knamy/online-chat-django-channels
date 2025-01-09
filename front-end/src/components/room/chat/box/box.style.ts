import styled, { css } from 'styled-components';
import { FlexCC } from '../../../../settings/styles/utils';
type props = {
  $isCurrentUser: boolean;
};

export const Container = styled.div<props>`
  ${({ $isCurrentUser }) => css`
    width: 100%;
    height: auto;
    position: relative;

    .chat-container {
      width: auto;
      min-width: 250px;
      max-width: 80%;
      height: auto;
      color: white;
      display: flex;
      align-items: start;
      justify-content: start;
      position: relative;
      flex-direction: ${$isCurrentUser ? 'row-reverse' : 'row'};
      float: ${$isCurrentUser ? 'right' : 'left'};
      gap: 5px;
    }

    .chat-profile {
      
      ${FlexCC}
      color: black;
      background-color: #fff;
      img, & {
        width: 50px;
        min-width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }

    .chat-text {
      width: auto;
      min-width: 200px;
      height: auto;
      min-height: 50px;
      display: flex;
      justify-content: start;
      align-items: start;
      flex-direction: column;
      gap: 5px;
      padding: 5px 10px;
      word-break: break-all;
      color: white;

      border-radius: 10px;
      background-color: ${$isCurrentUser ? 'rgb(87, 87, 87)' : 'rgb(73, 72, 106)'};;
      .chat-details {
        ${FlexCC}
        flex-direction: row;
        gap: 5px;
        color: black;
        span {
          font: italic;
          font-family: cursive;
          font-size: 16px;
        }
        p {
          font-size: 12px;
        }
      }
      .chat-content {
        p {
          font-size: 20px;
          font-family: 'Courier New', Courier, monospace;
        }
        .show-more {
          background-color: white;
          color: black;
          cursor: pointer;
          font-size: 15px;
        }
      }
      
      }

      
      
    }
  `}
`;
