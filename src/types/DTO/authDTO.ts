export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  data: {
    email: string;
    name: string;
    authToken: string;
  };
}
