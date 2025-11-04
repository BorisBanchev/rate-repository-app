import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({
  orderBy = "CREATED_AT",
  orderDirection = "DESC",
}) => {
  const { data, loading, refetch, error } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection },
    fetchPolicy: "cache-and-network",
  });

  const repositories = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return { repositories, loading, refetch, error };
};

export default useRepositories;
