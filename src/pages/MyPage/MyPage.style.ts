import styled from "@emotion/styled";

export const Title = styled.p`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title2Bold.fontWeight};
  margin: ${({ theme }) => theme.spacing.spacing4}
    ${({ theme }) => theme.spacing.spacing0};
`;

export const Description = styled.p`
  line-height: 1.4;
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
`;

export const LogoutButton = styled.button`
  background: ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  border: none;
  padding: ${({ theme }) =>
    `${theme.spacing.spacing2} ${theme.spacing.spacing4}`};
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body2Regular.fontWeight};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.gray400};
  }

  &:active {
    background: ${({ theme }) => theme.colors.gray500};
  }
`;
