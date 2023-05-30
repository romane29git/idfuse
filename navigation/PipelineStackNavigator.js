import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenOptions } from "../theme/styles";
import LoginScreen from "../screens/LoginScreen";

const PipelineStack = createNativeStackNavigator();

const PipelineStackNavigator = () => {
  return (
    <PipelineStack.Navigator
      initialRouteName="Pipeline"
      screenOptions={screenOptions}
    >
      <PipelineStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
    </PipelineStack.Navigator>
  );
};

export default PipelineStackNavigator;
