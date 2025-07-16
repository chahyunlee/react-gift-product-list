import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "@/routes/path";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import { Title, Description, LogoutButton } from "@/pages/MyPage/MyPage.style";

const MyPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.user) {
      navigate(RouterPath.LOGIN, { replace: true });
    }
  }, [auth, navigate]);

  if (!auth?.user) return null;

  const userEmail = auth.user.email;
  const userId = userEmail.split("@")[0];

  const handleLogout = () => {
    auth.logout();
    navigate(RouterPath.LOGIN);
  };

  return (
    <>
      <NavigationBar />
      <Title>마이페이지</Title>
      <Description>
        {userId}님 안녕하세요!
        <br />
        이메일 주소는 {userEmail}입니다.
      </Description>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </>
  );
};

export default MyPage;
