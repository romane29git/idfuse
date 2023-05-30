import React from "react";
import { StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import PipelineStackNavigator from "./PipelineStackNavigator";
import InvoiceStackNavigator from "./InvoiceStackNavigator";
import SettingsStackNavigator from "./SettingsStackNavigator";


const Tab = createBottomTabNavigator();

const RootTabNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#AC6DF4" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "ios-podium" : "ios-podium-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "ios-people" : "ios-people-outline";
            } else if (route.name === "Pipeline") {
              iconName = focused ? "ios-person" : "ios-person-outline";
            } else if (route.name === "Invoice") {
              iconName = focused ? "ios-person" : "ios-person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#AC6DF4",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="Pipeline" component={PipelineStackNavigator} />
        <Tab.Screen name="Invoice" component={InvoiceStackNavigator} />
        <Tab.Screen name="Settings" component={SettingsStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootTabNavigator;