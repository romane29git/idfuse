import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Contacts from "../components/Contacts";

const ContactsStack = createStackNavigator();

const ContactsStackNavigator = () => {
  return (
    <ContactsStack.Navigator
      initialRouteName="Contacts"
      screenOptions={screenOptions}
    >
      <ContactsStack.Screen
        name="Contacts"
        component={Contacts}
        options={{ title: "Contacts" }}
      />
    </ContactsStack.Navigator>
  );
};

export default ContactsStackNavigator;
