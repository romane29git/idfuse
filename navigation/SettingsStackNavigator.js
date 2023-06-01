import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Companies from "../components/Companies";

const SettingsStack = createStackNavigator();

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
