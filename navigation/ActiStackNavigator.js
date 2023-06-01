import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Contacts from "../components/Contacts";

const ActiStack = createStackNavigator();

const ActiStackNavigator = () => {
  return (
    <ActiStack.Navigator
      initialRouteName="Acti"
      screenOptions={screenOptions}
    >
      <ActiStack.Screen
        name="Contact"
        component={Contacts}
        options={{ title: "Contact" }}
      />
    </ActiStack.Navigator>
  );
};

export default ActiStackNavigator;
