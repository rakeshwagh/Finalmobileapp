import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import App from "./App";
import SignInStack from "./src/stack/SignInStack";
import SignOutStack from "./src/stack/SignOutStack";

export default function Navigation() {
  let isAuthenticated = true;
  return (
    <NavigationContainer>
      {isAuthenticated ? <SignInStack /> : <SignOutStack />}
    </NavigationContainer>
  );
}
