import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../../theme";
import { Link } from "react-router-native";

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

const AppBarTab = ({ children, to }) => {
  return (
    <Link to={to} style={styles.tab}>
      <Text color="textSecondary" fontWeight="bold" fontSize="subheading">
        {children}
      </Text>
    </Link>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={{ flexDirection: "row" }}>
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="signin">Sign in</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
