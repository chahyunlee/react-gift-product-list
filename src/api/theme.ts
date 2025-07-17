import apiUser from "@/api/apiUser";
import type { Themetype } from "@/types/DTO/themeDTO";

export async function getThemes(): Promise<Themetype[]> {
  try {
    const response = await apiUser.get<{ data: Themetype[] }>("/themes");
    return response.data.data;
  } catch (error) {
    console.error("테마 목록을 불러오는데 실패했습니다:", error);
    throw error;
  }
}
