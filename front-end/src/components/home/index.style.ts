import styled from 'styled-components';
import { FlexCC } from '../../settings/styles/utils';

export const HomeContainer = styled.main`
  width: 1000px;
  margin: 0 auto;
  position: relative;
  margin-top: 150px;
  height: 700px;
  background-color: rgba(230, 230, 230, 0.4);

  display: flex;
  flex-direction: column;
  border-radius: 20px 20px 0px 0px;
  /* overflow: hidden; */
`;

export const Content = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: row;

  .welcome-room {
    width: 100%;
    height: 100%;
    ${FlexCC}
    /* gap: 30px;
    flex-direction: column; */
    text-align: center;

    span {
      font-size: 40px;
    }
  }
`;
