import { useState, useEffect } from "react";
import { getThemes } from "@/api/theme";
import type { Themetype } from "@/types/DTO/themeDTO";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import {
  Container,
  Title,
  Grid,
  CategoryItem,
  CategoryImage,
  Text,
} from "@/sections/CategorySection/CategorySection.style";

const CategorySection = () => {
  const [themes, setThemes] = useState<Themetype[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getThemes();
        setThemes(data);
      } catch (err) {
        setError("테마 목록을 불러오는데 실패했습니다.");
        console.error("테마 로딩 에러:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  if (loading) {
    return (
      <Container>
        <LoadingSpinner size={40} />
      </Container>
    );
  }

  if (error || themes.length === 0) {
    return null;
  }

  return (
    <Container>
      <Title>선물 테마</Title>
      <Grid>
        {themes.map((theme) => (
          <CategoryItem key={theme.themeId}>
            <CategoryImage src={theme.image} alt={theme.name} />
            <Text>{theme.name}</Text>
          </CategoryItem>
        ))}
      </Grid>
    </Container>
  );
};

export default CategorySection;
