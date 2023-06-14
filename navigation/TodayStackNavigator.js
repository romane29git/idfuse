import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Search from "../components/Search";

const TodayStack = createStackNavigator();

const TodayStackNavigator = () => {
  return (
    <TodayStack.Navigator initialRouteName="Today" screenOptions={screenOptions}>
      <TodayStack.Screen
        name="Search"
        component={Search}
        options={{ title: "Search" , headerShown: false}}
      />
    </TodayStack.Navigator>
  );
};

export default TodayStackNavigator;