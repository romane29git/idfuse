import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Map from "../components/Map";

const DevisStack = createStackNavigator();

const DevisStackNavigator = () => {
  return (
    <DevisStack.Navigator
      initialRouteName="Devis"
      screenOptions={screenOptions}
    >
      <DevisStack.Screen
        name="Map"
        component={Map}
        options={{ title: "Map", headerShown: false }}
      />
    </DevisStack.Navigator>
  );
};

export default DevisStackNavigator;
