import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Devis from "../components/Devis";

const DevisStack = createStackNavigator();

const DevisStackNavigator = () => {
  return (
    <DevisStack.Navigator
      initialRouteName="Devis"
      screenOptions={screenOptions}
    >
      <DevisStack.Screen
        name="Devis"
        component={Devis}
        options={{ title: "Devis" }}
      />
    </DevisStack.Navigator>
  );
};

export default DevisStackNavigator;
