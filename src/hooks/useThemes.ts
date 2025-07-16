import { useState, useEffect } from 'react';
import { getThemes } from '@/api/theme';
import type { Themetype } from '@/types/themeDTO/theme';

export const useThemes = () => {
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
        setError('테마 목록을 불러오는데 실패했습니다.');
        console.error('테마 로딩 에러:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  return { themes, loading, error };
}; 