import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    backgroundColor: "white",
    padding: 10,
  },
  picker: {
    backgroundColor: "white",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [sort, setSort] = useState("LATEST");
  const sortMap = {
    LATEST: { orderBy: "CREATED_AT", orderDirection: "DESC" },
    HIGHEST: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
    LOWEST: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
  };
  const { orderBy, orderDirection } = sortMap[sort];
  const { repositories } = useRepositories({ orderBy, orderDirection });
  const navigate = useNavigate();
  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
      <RepositoryItem {...item} />
    </Pressable>
  );

  const ListHeader = () => (
    <View style={styles.header}>
      <Picker
        selectedValue={sort}
        onValueChange={(v) => setSort(v)}
        style={styles.picker}
      >
        <Picker.Item label="Latest repositories" value="LATEST" />
        <Picker.Item label="Highest rated repositories" value="HIGHEST" />
        <Picker.Item label="Lowest rated repositories" value="LOWEST" />
      </Picker>
    </View>
  );

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeader}
    />
  );
};

export default RepositoryList;
