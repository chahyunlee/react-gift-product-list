import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RouterPath } from "@/routes/path";
import { getThemeInfo, getThemeProducts } from "@/api/user/theme";
import type { ThemeInfoResponseDTO } from "@/types/DTO/themeDTO";
import type { cardItemData } from "@/types/DTO/productDTO";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import CardList from "@/components/CardList/CardList";
import {
  Wrapper,
  Container,
  HeroSection,
  ThemeLabel,
  ThemeTitle,
  ThemeDescription,
  Section,
  EmptyBox,
} from "@/pages/ThemePage/ThemePage.style";

const ThemePage = () => {
  const [theme, setTheme] = useState<ThemeInfoResponseDTO | null>(null);
  const [products, setProducts] = useState<cardItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const loadThemeInfo = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const themeData = await getThemeInfo(Number(id));
      setTheme(themeData);

      const productData = await getThemeProducts(Number(id));
      const transformedProducts = productData.list.map((product) => ({
        id: product.id,
        imageUrl: product.imageURL,
        brand: product.brandInfo.name,
        name: product.name,
        price: product.price.sellingPrice,
      }));
      setProducts(transformedProducts);
    } catch (err: any) {
      if (err?.response?.status === 404) {
        navigate(RouterPath.HOME, { replace: true });
      }
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    loadThemeInfo();
  }, [loadThemeInfo]);

  if (loading) {
    return <LoadingSpinner size={30} />;
  }

  if (!theme) {
    return <div>테마를 불러오지 못했습니다.</div>;
  }

  return (
    <Wrapper>
      <NavigationBar />
      <Container>
        {theme && (
          <HeroSection bgColor={theme.backgroundColor}>
            <ThemeLabel>{theme.name}</ThemeLabel>
            <ThemeTitle>{theme.title}</ThemeTitle>
            <ThemeDescription>{theme.description}</ThemeDescription>
          </HeroSection>
        )}
        <Section>
          {products.length === 0 ? (
            <EmptyBox>상품이 없습니다.</EmptyBox>
          ) : (
            <CardList cards={products} showRank={false} />
          )}
        </Section>
      </Container>
    </Wrapper>
  );
};

export default ThemePage;
