import { useState, useEffect, useCallback, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RouterPath } from "@/routes/path";
import { getThemeInfo, getThemeProducts } from "@/api/user/theme";
import type { ThemeInfoResponseDTO } from "@/types/DTO/themeDTO";
import type { CardItem } from "@/types/DTO/productDTO";
import { AuthContext } from "@/context/AuthContext";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
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
  const [products, setProducts] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMoreList, setHasMoreList] = useState(true);
  const [page, setPage] = useState(0);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext가 제공되지 않았습니다.");
  }
  const { user } = authContext;

  const loadThemeInfo = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const themeData = await getThemeInfo(Number(id));
      setTheme(themeData);
    } catch (err: any) {
      if (err?.response?.status === 404) {
        navigate(RouterPath.HOME, { replace: true });
      }
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  const loadProducts = useCallback(async () => {
    if (!id || !hasMoreList) return;
    setLoading(true);
    try {
      const productData = await getThemeProducts(Number(id), page);
      const transformedProducts: CardItem[] = productData.list.map(
        (product) => ({
          id: product.id,
          imageUrl: product.imageURL,
          brand: product.brandInfo.name,
          name: product.name,
          price: product.price.sellingPrice,
        })
      );
      setProducts((prev) =>
        page === 0 ? transformedProducts : [...prev, ...transformedProducts]
      );
      setHasMoreList(productData.hasMoreList);
    } finally {
      setLoading(false);
    }
  }, [id, page, hasMoreList]);

  useEffect(() => {
    loadThemeInfo();
  }, [loadThemeInfo]);

  useEffect(() => {
    loadProducts();
  }, [page]);

  useInfiniteScroll({
    targetRef: observerRef,
    hasMore: hasMoreList,
    isLoading: loading,
    onLoadMore: () => setPage((prev) => prev + 1),
  });

  const handleCardClick = (cardId: number) => {
    if (!user) {
      navigate("/login", { state: { from: `/order/${cardId}` } });
    } else {
      navigate(`/order/${cardId}`);
    }
  };

  if (loading && products.length === 0) {
    return <LoadingSpinner size={30} />;
  }

  if (!theme) {
    return <div>테마를 불러오지 못했습니다.</div>;
  }

  return (
    <Wrapper>
      <NavigationBar />
      <Container>
        <HeroSection bgColor={theme.backgroundColor}>
          <ThemeLabel>{theme.name}</ThemeLabel>
          <ThemeTitle>{theme.title}</ThemeTitle>
          <ThemeDescription>{theme.description}</ThemeDescription>
        </HeroSection>
        <Section>
          {products.length === 0 ? (
            <EmptyBox>상품이 없습니다.</EmptyBox>
          ) : (
            <>
              <CardList
                cards={products}
                showRank={false}
                lastCardRef={hasMoreList ? observerRef : undefined}
                onCardClick={handleCardClick}
              />
              {loading && <LoadingSpinner size={20} />}
            </>
          )}
        </Section>
      </Container>
    </Wrapper>
  );
};

export default ThemePage;
