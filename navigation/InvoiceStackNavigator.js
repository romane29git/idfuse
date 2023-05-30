import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenOptions } from "../theme/styles";
import Contacts from "../components/Contacts";

const InvoiceStack = createNativeStackNavigator();

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
