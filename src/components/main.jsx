import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import { Route, Routes, Navigate } from "react-router-native";
import SingleRepositoryView from "./SingleRepositoryView";
import CreateReview from "./CreateReview";
import SignUp from "./SignUp";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/repositories/:id" element={<SingleRepositoryView />} />
      </Routes>
    </View>
  );
};

export default Main;
