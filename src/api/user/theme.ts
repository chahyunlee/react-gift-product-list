import apiUser from "@/api/common/apiUser";
import type { Themetype, ThemeInfoResponseDTO } from "@/types/DTO/themeDTO";

export async function getThemes(): Promise<Themetype[]> {
  try {
    const response = await apiUser.get<{ data: Themetype[] }>("/themes");
    return response.data.data;
  } catch (error) {
    console.error("테마 목록을 불러오는데 실패했습니다:", error);
    throw error;
  }
}

export async function getThemeInfo(
  themeId: number
): Promise<ThemeInfoResponseDTO> {
  try {
    const response = await apiUser.get<{ data: ThemeInfoResponseDTO }>(
      `/themes/${themeId}/info`
    );
    return response.data.data;
  } catch (error) {
    console.error("테마 정보를 불러오는데 실패했습니다:", error);
    throw error;
  }
}
