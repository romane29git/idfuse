import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Dashboard from "../screens/Dashboard";

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <HomeStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ title: "Dashboard" }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;