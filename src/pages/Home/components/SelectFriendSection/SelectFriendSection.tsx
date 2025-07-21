import { FiPlus } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  Wrapper,
  Container,
  PlusButton,
  Title,
  UserId,
} from "@/pages/Home/components/SelectFriendSection/SelectFriendSection.style";

const SelectFriendSection = () => {
  const auth = useContext(AuthContext);
  const userEmail = auth?.user?.data.name;
  const userId = userEmail ? userEmail.split("@")[0] : "";

  return (
    <Wrapper>
      <Container>
        <PlusButton>
          <FiPlus size={30} />
        </PlusButton>
        {userId && <UserId>{userId}님!</UserId>}
        <Title>선물할 친구를 선택해 주세요.</Title>
      </Container>
    </Wrapper>
  );
};

export default SelectFriendSection;
