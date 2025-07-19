export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  email: string;
  name: string;
  authToken: string;
}
