import apiClient from "@/api/apiClient";
import type { Themetype } from "@/types/themeDTO/theme";

export async function getThemes(): Promise<Themetype[]> {
  try {
    const response = await apiClient.get<{ data: Themetype[] }>("/themes");
    return response.data.data;
  } catch (error) {
    console.error('테마 목록을 불러오는데 실패했습니다:', error);
    throw error;
  }
}
