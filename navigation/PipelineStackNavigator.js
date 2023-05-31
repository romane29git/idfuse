import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenOptions } from "../theme/styles";
import Companies from "../components/Companies";

const PipelineStack = createNativeStackNavigator();

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
