import React from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { useFormik } from "formik";

const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit,
  });

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        testID="usernameInput"
      />
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
        testID="passwordInput"
      />
      <Pressable onPress={formik.handleSubmit} testID="submitButton">
        <Text>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignInContainer;
