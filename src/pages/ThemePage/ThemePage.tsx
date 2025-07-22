import { useParams } from "react-router-dom";

const ThemePage = () => {
  const { id } = useParams();

  return <>{id}</>;
};

export default ThemePage;
