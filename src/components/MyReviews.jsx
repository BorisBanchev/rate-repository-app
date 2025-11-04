import { FlatList, View, StyleSheet } from "react-native";
import { format } from "date-fns";
import { useQuery, useMutation } from "@apollo/client";
import { Alert, Pressable } from "react-native";
import Text from "./Text";
import { GET_CURRENT_USER } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";

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
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  viewButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#0366d6",
    borderRadius: 4,
    padding: 10,
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: "#d73a49",
    borderRadius: 4,
    padding: 10,
    alignItems: "center",
  },
  actionText: { color: "white", fontWeight: "bold" },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, onViewRepo, onDelete }) => (
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
    <View style={styles.actionsRow}>
      <Pressable
        style={styles.viewButton}
        onPress={() => onViewRepo(review.repository.id)}
      >
        <Text style={styles.actionText}>View repository</Text>
      </Pressable>
      <Pressable
        style={styles.deleteButton}
        onPress={() => onDelete(review.id)}
      >
        <Text style={styles.actionText}>Delete review</Text>
      </Pressable>
    </View>
  </View>
);

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();

  if (loading || !data?.me) return null;

  const reviews = data.me.reviews?.edges
    ? data.me.reviews.edges.map((e) => e.node)
    : [];

  const handleViewRepo = (id) => {
    navigate(`/repositories/${id}`);
  };

  const handleDelete = (reviewId) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: reviewId } });
              await refetch();
            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          onViewRepo={handleViewRepo}
          onDelete={handleDelete}
        />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
