import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenOptions } from "../theme/styles";
import Companies from "../components/Companies";

const SettingsStack = createNativeStackNavigator();

const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator
      initialRouteName="Settings"
      screenOptions={screenOptions}
    >
      <SettingsStack.Screen
        name="Companies"
        component={Companies}
        options={{ title: "Companies" }}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsStackNavigator;
