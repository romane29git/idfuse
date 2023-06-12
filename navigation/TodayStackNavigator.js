import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Dashboard from "../screens/Dashboard";

const TodayStack = createStackNavigator();

const TodayStackNavigator = () => {
  return (
    <TodayStack.Navigator initialRouteName="Today" screenOptions={screenOptions}>
      <TodayStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ title: "Dashboard" , headerShown: false}}
      />
    </TodayStack.Navigator>
  );
};

export default TodayStackNavigator;