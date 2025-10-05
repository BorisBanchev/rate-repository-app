import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../../theme";

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

const AppBarTab = ({ children }) => {
  return (
    <Pressable style={styles.tab}>
      <Text color="textSecondary" fontWeight="bold" fontSize="subheading">
        {children}
      </Text>
    </Pressable>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab>Repositories</AppBarTab>
    </View>
  );
};

export default AppBar;
