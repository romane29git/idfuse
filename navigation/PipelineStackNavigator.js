import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Companies from "../components/Companies";

const PipelineStack = createStackNavigator();

const PipelineStackNavigator = () => {
  return (
    <PipelineStack.Navigator
      initialRouteName="Pipeline"
      screenOptions={screenOptions}
    >
      <PipelineStack.Screen
        name="Companies"
        component={Companies}
        options={{ title: "Companies" }}
      />
    </PipelineStack.Navigator>
  );
};

export default PipelineStackNavigator;
