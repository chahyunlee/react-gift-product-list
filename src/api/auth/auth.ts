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
  const token = response.data.data.authToken;

  const userInfo = {
    email: response.data.data.email,
    name: response.data.data.name,
    authToken: token,
  };

  localStorage.setItem("userInfo", JSON.stringify(userInfo));

  return response.data;
}
