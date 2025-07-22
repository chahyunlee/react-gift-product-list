import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeroSection = styled.section<{ bgColor: string }>`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.bgColor};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.spacing2};
`;

export const ThemeLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray00};
  font-weight: ${({ theme }) => theme.typography.body1Regular.fontWeight};
  margin: ${({ theme }) => theme.spacing.spacing2}
    ${({ theme }) => theme.spacing.spacing2};
`;

export const ThemeTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  color: ${({ theme }) => theme.colors.gray00};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  margin: ${({ theme }) => theme.spacing.spacing3}
    ${({ theme }) => theme.spacing.spacing2} 0;
`;

export const ThemeDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray00};
  font-weight: ${({ theme }) => theme.typography.body2Regular.fontWeight};
  margin-left: ${({ theme }) => theme.spacing.spacing2};
`;

export const Section = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
`;

export const EmptyBox = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray00};
  text-align: center;
  width: 100%;
  padding: 20px;
`;

export const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ProductCard = styled.div`
  width: 30%;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background-color: white;
  text-align: center;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

export const ProductName = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 10px;
`;

export const ProductBrand = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray00};
  margin-top: 5px;
`;

export const ProductPrice = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray00};
  margin-top: 10px;
`;
