import { toast } from "react-toastify";
import { createContext, useState } from "react";
import { login as loginAPI } from "@/api/auth/auth";
import { userStorage } from "@/storage/localStoarge";
import type { LoginRequestDto, LoginResponseDto } from "@/types/DTO/authDTO";

interface AuthContextType {
  user: LoginResponseDto | null;
  login: (user: LoginRequestDto) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoginResponseDto | null>(userStorage.get());

  const login = async (data: LoginRequestDto) => {
    try {
      const response = await loginAPI(data);
      userStorage.set(response);
      setUser(response);
    } catch (error: any) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        toast.error(
          error.response.data.message || "@kakao.com 이메일 주소만 가능합니다."
        );
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
      throw error;
    }
  };

  const logout = () => {
    userStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
