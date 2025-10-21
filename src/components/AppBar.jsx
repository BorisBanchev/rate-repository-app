import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../../theme";
import { Link, useNavigate } from "react-router-native";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: theme.colors.appBar,
    flexDirection: "row",
    paddingLeft: 10,
    paddingBottom: 15,
  },
  tab: {
    marginRight: 20,
  },
});

const AppBarTab = ({ children, to, onPress }) => {
  if (onPress) {
    return (
      <Pressable style={styles.tab} onPress={onPress}>
        <Text color="textAppBar" fontWeight="bold" fontSize="subheading">
          {children}
        </Text>
      </Pressable>
    );
  }
  return (
    <Link to={to} style={styles.tab}>
      <Text color="textAppBar" fontWeight="bold" fontSize="subheading">
        {children}
      </Text>
    </Link>
  );
};

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate("/signin");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={{ flexDirection: "row" }}>
        <AppBarTab to="/">Repositories</AppBarTab>
        {data?.me && <AppBarTab to="/create-review">Create a review</AppBarTab>}
        {data?.me ? (
          <AppBarTab onPress={handleSignOut}>Sign out</AppBarTab>
        ) : (
          <AppBarTab to="/signin">Sign in</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
