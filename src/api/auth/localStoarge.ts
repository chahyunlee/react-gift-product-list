import type { LoginResponseDto } from "@/types/DTO/authDTO";

const USER_INFO_KEY = "userInfo";

export const userStorage = {
  set(userInfo: LoginResponseDto) {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  },

  get(): LoginResponseDto | null {
    const stored = localStorage.getItem(USER_INFO_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  clear() {
    localStorage.removeItem(USER_INFO_KEY);
  },
};
