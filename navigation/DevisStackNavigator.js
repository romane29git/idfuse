import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import AddCompanies from "../components/AddCompanies";

const DevisStack = createStackNavigator();

const DevisStackNavigator = () => {
  return (
    <DevisStack.Navigator
      initialRouteName="Devis"
      screenOptions={screenOptions}
    >
      <DevisStack.Screen
        name="AddCompanies"
        component={AddCompanies}
        options={{ title: "AddCompanies", headerShown: false }}
      />
    </DevisStack.Navigator>
  );
};

export default DevisStackNavigator;
