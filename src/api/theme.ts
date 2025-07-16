import apiClient from "@/api/apiUser";
import type { Themetype } from "@/types/themeDTO/theme";

export async function getThemes(): Promise<Themetype[]> {
  const response = await apiClient.get<{ data: Themetype[] }>("/themes");
  return response.data.data;
}
