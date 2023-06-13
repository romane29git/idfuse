import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import AddCompanies from "../components/AddCompanies";

const TodayStack = createStackNavigator();

const TodayStackNavigator = () => {
  return (
    <TodayStack.Navigator initialRouteName="Today" screenOptions={screenOptions}>
      <TodayStack.Screen
        name="AddCompanies"
        component={AddCompanies}
        options={{ title: "AddCompanies" , headerShown: false}}
      />
    </TodayStack.Navigator>
  );
};

export default TodayStackNavigator;