import type { LoginResponseDto } from "@/types/DTO/authDTO";

const USER_INFO_KEY = "userInfo";
const AUTH_TOKEN_KEY = "authToken";

export const userStorage = {
  set(userInfo: LoginResponseDto) {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
    if (userInfo.data?.authToken) {
      localStorage.setItem(AUTH_TOKEN_KEY, userInfo.data.authToken);
    }
  },

  get(): LoginResponseDto | null {
    const stored = localStorage.getItem(USER_INFO_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  getAuthToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  clear() {
    localStorage.removeItem(USER_INFO_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },
};
