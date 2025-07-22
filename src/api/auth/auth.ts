import apiUser from "@/api/common/apiUser";
import type { LoginRequestDto, LoginResponseDto } from "@/types/DTO/authDTO";

export async function login({
  email,
  password,
}: LoginRequestDto): Promise<LoginResponseDto> {
  const response = await apiUser.post<LoginResponseDto>("/login", {
    email,
    password,
  });
  return response.data;
}
