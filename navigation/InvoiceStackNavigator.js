import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Contacts from "../components/Contacts";

const InvoiceStack = createStackNavigator();

const InvoiceStackNavigator = () => {
  return (
    <InvoiceStack.Navigator
      initialRouteName="Invoice"
      screenOptions={screenOptions}
    >
      <InvoiceStack.Screen
        name="Contact"
        component={Contacts}
        options={{ title: "Contact" }}
      />
    </InvoiceStack.Navigator>
  );
};

export default InvoiceStackNavigator;
