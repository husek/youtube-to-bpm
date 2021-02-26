import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Image = styled.img`
  width: 200px;
  animation: ${rotate} 30s linear infinite;
`;

export const Container = styled.div`
  height: 100vh;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  section {
    border: dashed 6px #362265;
    padding: 1em;
    width: 100%;
    height: 100%
  }

  .logo {
    margin-left: -199px;
  }

  footer {
    position: absolute;
    bottom: 0;
    text-align: right;
    width: 100%;
  }
`;

export const Text = styled.p`
  margin-top: 35px;
  font-size: 20px;
  font-weight: bold;
`;
