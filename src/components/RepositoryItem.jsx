import { View, Image, StyleSheet, Pressable, Linking } from "react-native";
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
  githubButton: {
    marginTop: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 10,
    alignItems: "center",
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
      <Text testID="stargazersCount" style={styles.statValue}>
        {formatCount(stargazersCount)}
      </Text>
      <Text style={styles.statLabel}>Stars</Text>
    </View>
    <View style={styles.statItem}>
      <Text testID="forksCount" style={styles.statValue}>
        {formatCount(forksCount)}
      </Text>
      <Text style={styles.statLabel}>Forks</Text>
    </View>
    <View style={styles.statItem}>
      <Text testID="reviewCount" style={styles.statValue}>
        {reviewCount}
      </Text>
      <Text style={styles.statLabel}>Reviews</Text>
    </View>
    <View style={styles.statItem}>
      <Text testID="ratingAverage" style={styles.statValue}>
        {ratingAverage}
      </Text>
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
  url,
  showGithubButton = false,
}) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.topRow}>
        <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.info}>
          <Text testID="fullName" style={styles.fullName}>
            {fullName}
          </Text>
          <Text testID="description" style={styles.description}>
            {description}
          </Text>
          <Text testID="language" style={styles.languageTag}>
            {language}
          </Text>
        </View>
      </View>
      <RepositoryStats
        stargazersCount={stargazersCount}
        forksCount={forksCount}
        reviewCount={reviewCount}
        ratingAverage={ratingAverage}
      />
      {showGithubButton && url && (
        <Pressable
          style={styles.githubButton}
          onPress={() => Linking.openURL(url)}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Open in Github
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
