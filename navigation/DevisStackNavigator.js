import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Opportunity from "../components/Opportunity";

const DevisStack = createStackNavigator();

const DevisStackNavigator = () => {
  return (
    <DevisStack.Navigator
      initialRouteName="Devis"
      screenOptions={screenOptions}
    >
      <DevisStack.Screen
        name="Opportunity"
        component={Opportunity}
        options={{ title: "Opportunity" }}
      />
    </DevisStack.Navigator>
  );
};

export default DevisStackNavigator;
