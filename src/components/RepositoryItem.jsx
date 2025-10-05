import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  topRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 15,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  fullName: {
    fontWeight: "bold",
    fontSize: theme.fontSizes.subheading,
    marginBottom: 4,
  },
  description: {
    color: theme.colors.textSecondary,
    marginBottom: 6,
  },
  languageTag: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    color: "white",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 4,
    marginBottom: 4,
    overflow: "hidden",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontWeight: "bold",
    fontSize: 16,
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
});

const formatCount = (count) => {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);
};

const RepositoryStats = ({
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage,
}) => (
  <View style={styles.statsRow}>
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{formatCount(stargazersCount)}</Text>
      <Text style={styles.statLabel}>Stars</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{formatCount(forksCount)}</Text>
      <Text style={styles.statLabel}>Forks</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{reviewCount}</Text>
      <Text style={styles.statLabel}>Reviews</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{ratingAverage}</Text>
      <Text style={styles.statLabel}>Rating</Text>
    </View>
  </View>
);

const RepositoryItem = ({
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  ownerAvatarUrl,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.fullName}>{fullName}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.languageTag}>{language}</Text>
        </View>
      </View>
      <RepositoryStats
        stargazersCount={stargazersCount}
        forksCount={forksCount}
        reviewCount={reviewCount}
        ratingAverage={ratingAverage}
      />
    </View>
  );
};

export default RepositoryItem;
