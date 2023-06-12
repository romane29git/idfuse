import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Companies from "../components/Companies";
import Company from "../components/Company";
import Contact from "../components/Contact";
import Opportunity from "../components/Opportunity";

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
        options={{ title: "Companies", headerShown: false}}
      />
      <ContactsStack.Screen
        name="Company"
        component={Company}
        options={{ title: "Company",headerShown: false }}
      />
      <ContactsStack.Screen
        name="Contact"
        component={Contact}
        options={{ title: "Contact", headerShown: false }}
      />
      <ContactsStack.Screen
        name="Opportunity"
        component={Opportunity}
        options={{ title: "Opportunity", headerShown: false }}
      />
    </ContactsStack.Navigator>
  );
};

export default ContactsStackNavigator;
