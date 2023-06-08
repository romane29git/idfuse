import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Companies from "../components/Companies";
import Company from "../components/Company";
import Contact from "../components/Contact";

const ContactsStack = createStackNavigator();

const ContactsStackNavigator = () => {
  return (
    <ContactsStack.Navigator
      initialRouteName="Contacts"
      screenOptions={screenOptions}
    >
      <ContactsStack.Screen
        name="Companies"
        component={Companies}
        options={{ title: "Companies" }}
      />
      <ContactsStack.Screen
        name="Company"
        component={Company}
        options={{ title: "Company" }}
      />
      <ContactsStack.Screen
        name="Contact"
        component={Contact}
        options={{ title: "Contact" }}
      />
    </ContactsStack.Navigator>
  );
};

export default ContactsStackNavigator;
