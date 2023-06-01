import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Companies from "../components/Companies";

const DevisStack = createStackNavigator();

const DevisStackNavigator = () => {
  return (
    <DevisStack.Navigator
      initialRouteName="Devis"
      screenOptions={screenOptions}
    >
      <DevisStack.Screen
        name="Companies"
        component={Companies}
        options={{ title: "Companies" }}
      />
    </DevisStack.Navigator>
  );
};

export default DevisStackNavigator;
