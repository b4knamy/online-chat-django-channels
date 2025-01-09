import styled from 'styled-components';
import { FlexCC } from '../../settings/styles/utils';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: blue;

  ${FlexCC}
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;
