import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const { data, loading, error } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  return {
    repository: data?.repository,
    loading,
    error,
  };
};

export default useRepository;
