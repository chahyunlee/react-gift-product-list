import { LOCAL_STORAGE_KEY } from "@/constants/localStorageKeys";
import { storageUtil } from "@/utils/storageUtil";
import type { LoginResponseDto } from "@/types/DTO/authDTO";

export const userStorage = {
  set(userInfo: LoginResponseDto) {
    storageUtil.set(LOCAL_STORAGE_KEY.USER_INFO, userInfo);
    if (userInfo.data?.authToken) {
      storageUtil.set(LOCAL_STORAGE_KEY.AUTH_TOKEN, userInfo.data.authToken);
    }
  },

  get(): LoginResponseDto | null {
    return storageUtil.get<LoginResponseDto>(LOCAL_STORAGE_KEY.USER_INFO);
  },

  getAuthToken(): string | null {
    return storageUtil.get<string>(LOCAL_STORAGE_KEY.AUTH_TOKEN);
  },

  clear() {
    storageUtil.clear(LOCAL_STORAGE_KEY.USER_INFO);
    storageUtil.clear(LOCAL_STORAGE_KEY.AUTH_TOKEN);
  },
};
