import React from "react-native";
import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useNavigate } from "react-router-native";
import { useDebounce } from "use-debounce";
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
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { sort, onSortChange, searchValue, onSearchChange } = this.props;

    return (
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search repositories by name or owner"
          value={searchValue}
          onChangeText={onSearchChange}
          testID="searchInput"
        />
        <Picker
          selectedValue={sort}
          onValueChange={(v) => onSortChange(v)}
          style={styles.picker}
        >
          <Picker.Item label="Latest repositories" value="LATEST" />
          <Picker.Item label="Highest rated repositories" value="HIGHEST" />
          <Picker.Item label="Lowest rated repositories" value="LOWEST" />
        </Picker>
      </View>
    );
  };

  render() {
    const { repositories, onPress } = this.props;
    return (
      <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => onPress(item.id)}>
            <RepositoryItem {...item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [sort, setSort] = useState("LATEST");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const sortMap = {
    LATEST: { orderBy: "CREATED_AT", orderDirection: "DESC" },
    HIGHEST: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
    LOWEST: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
  };

  const { orderBy, orderDirection } = sortMap[sort];
  const { repositories } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearch,
  });

  const navigate = useNavigate();
  const handlePress = (id) => navigate(`/repositories/${id}`);

  return (
    <RepositoryListContainer
      repositories={repositories}
      sort={sort}
      onSortChange={setSort}
      searchValue={search}
      onSearchChange={setSearch}
      onPress={handlePress}
    />
  );
};

export default RepositoryList;
