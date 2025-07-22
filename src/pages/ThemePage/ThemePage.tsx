import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RouterPath } from "@/routes/path";
import { getThemeInfo } from "@/api/user/theme";
import type { ThemeInfoResponseDTO } from "@/types/DTO/themeDTO";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import {
  Wrapper,
  Container,
  HeroSection,
  ThemeLabel,
  ThemeTitle,
  ThemeDescription,
} from "@/pages/ThemePage/ThemePage.style";

const ThemePage = () => {
  const [theme, setTheme] = useState<ThemeInfoResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const loadThemeInfo = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await getThemeInfo(Number(id));
      setTheme(data);
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
      </Container>
    </Wrapper>
  );
};

export default ThemePage;
