import { View, Text, StyleSheet } from "react-native";

const RepositoryItem = ({
  fullName,
  description,
  language,
  forksCount,
  stargazerCount,
  ratingAverage,
  reviewCount,
}) => {
  return (
    <View>
      <Text>Full name: {fullName}</Text>
      <Text>Description: {description} </Text>
      <Text>Language: {language} </Text>
      <Text>Stars: {stargazerCount} </Text>
      <Text>Forks: {forksCount} </Text>
      <Text>Reviews: {reviewCount} </Text>
      <Text>Rating: {ratingAverage} </Text>
    </View>
  );
};

export default RepositoryItem;
