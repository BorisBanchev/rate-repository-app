import { FlatList, View, StyleSheet } from "react-native";
import { format } from "date-fns";
import { useQuery } from "@apollo/client";
import Text from "./Text";
import { GET_CURRENT_USER } from "../graphql/queries";

const styles = StyleSheet.create({
  separator: { height: 10 },
  reviewContainer: { padding: 15, backgroundColor: "white" },
  ratingCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#0366d6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  ratingText: { color: "#0366d6", fontWeight: "bold", fontSize: 20 },
  reviewHeader: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  reviewInfo: { flex: 1 },
  repoName: { fontWeight: "bold", marginBottom: 2 },
  date: { color: "#586069", marginBottom: 4 },
  reviewText: { marginTop: 4 },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => (
  <View style={styles.reviewContainer}>
    <View style={styles.reviewHeader}>
      <View style={styles.ratingCircle}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewInfo}>
        <Text style={styles.repoName}>{review.repository.fullName}</Text>
        <Text style={styles.date}>
          {format(new Date(review.createdAt), "dd.MM.yyyy")}
        </Text>
      </View>
    </View>
    <Text style={styles.reviewText}>{review.text}</Text>
  </View>
);

const MyReviews = () => {
  const { data, loading } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (loading || !data?.me) return null;

  const reviews = data.me.reviews?.edges
    ? data.me.reviews.edges.map((e) => e.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
