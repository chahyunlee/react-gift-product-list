import { createContext, useState } from "react";
import { login as loginAPI } from "@/api/auth/auth";
import { userStorage } from "@/api/auth/localStoarge";
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
      console.log("로그인 요청 데이터:", data);
      const response = await loginAPI(data);
      console.log("로그인 응답:", response);
      userStorage.set(response);
      setUser(response);
    } catch (error) {
      console.error("로그인 에러 상세:", error);
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
