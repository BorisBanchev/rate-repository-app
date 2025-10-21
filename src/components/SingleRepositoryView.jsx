import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);

  if (!repository) {
    return null;
  }
  return <RepositoryItem {...repository} showGithubButton={true} />;
};

export default SingleRepositoryView;
