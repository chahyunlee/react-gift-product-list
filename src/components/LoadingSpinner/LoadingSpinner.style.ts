import styled from "@emotion/styled";

export const SpinnerWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = `
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const SpinnerCircle = styled.div<{ size: number }>`
  ${spin}
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: ${({ size }) => Math.floor(size / 8)}px solid #e5e7eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
`;
