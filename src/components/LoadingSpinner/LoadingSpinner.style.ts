import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpinnerCircle = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: ${({ size }) => Math.floor(size / 8)}px solid #e5e7eb;
  border-top: ${({ size }) => Math.floor(size / 8)}px solid #6b7280; // 좀 더 명확한 대비 색
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
