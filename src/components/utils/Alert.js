import React from 'react';
import styled from 'styled-components';

import { ReactComponent as X } from '../../assets/svg/x.svg';

//TODO: Use a type icon instead of empty div
export default function Alert({ style, options, message, close }) {
  return (
    <Container style={style} onClick={close}>
      {options.type === 'info' && <div />}
      {options.type === 'success' && <div />}
      {options.type === 'error' && <div />}
      <span>{message}</span>
      <div>
        <X />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(3, 177, 45, 0.85);
  color: white;
  cursor: pointer;
  font-weight: 500;
  padding: 18px 23px;
  width: 100vw;
  @media (max-width: 500px) {
    padding: 13px 13px;
  }
`;
