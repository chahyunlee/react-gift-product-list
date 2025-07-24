import { useState, useEffect, useCallback, useRef } from "react";
import { getThemeInfo, getThemeProducts } from "@/api/user/theme";
import type { ThemeInfoResponseDTO } from "@/types/DTO/themeDTO";
import type { CardItem } from "@/types/DTO/productDTO";

export function useThemeProducts(themeId: number | undefined) {
  const [theme, setTheme] = useState<ThemeInfoResponseDTO | null>(null);
  const [products, setProducts] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMoreList, setHasMoreList] = useState(true);
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadThemeInfo = useCallback(async () => {
    if (!themeId) return;
    setLoading(true);
    try {
      const themeData = await getThemeInfo(themeId);
      setTheme(themeData);
    } finally {
      setLoading(false);
    }
  }, [themeId]);

  const loadProducts = useCallback(async () => {
    if (!themeId || !hasMoreList) return;
    setLoading(true);
    try {
      const productData = await getThemeProducts(themeId, page);
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
        page === 1 ? transformedProducts : [...prev, ...transformedProducts]
      );
      setHasMoreList(productData.hasMoreList);
    } finally {
      setLoading(false);
    }
  }, [themeId, page, hasMoreList]);

  useEffect(() => {
    loadThemeInfo();
  }, [loadThemeInfo]);

  useEffect(() => {
    loadProducts();
  }, [page]);

  useEffect(() => {
    if (!hasMoreList || loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { root: null, rootMargin: "0px", threshold: 1 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMoreList, loading, products.length]);

  return {
    theme,
    products,
    loading,
    hasMoreList,
    observerRef,
  };
}
