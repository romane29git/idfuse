import React from "react";
import Header from "./components/Header";
// import Companies from "./Companies";
// import AddCompanies from "./AddCompanies";
import { View, Button, Text } from "react-native";
import { Card } from "react-native-elements";
import Dashboard from "./screens/Dashboard";
import styles from "./theme/styles";
// import Contacts from "./Contacts";
// import { Provider } from "react-native-paper";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { theme } from "./core/theme";
// import {
//   StartScreen,
//   LoginScreen,
//   RegisterScreen,
//   ResetPasswordScreen,
//   Dashboard,
// } from "./screens";

// const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Dashboard />
    </View>

    // page login
    // <Provider theme={theme}>
    //   <NavigationContainer>
    //     <Stack.Navigator
    //       initialRouteName="StartScreen"
    //       screenOptions={{
    //         headerShown: false,
    //       }}
    //     >
    //       <Stack.Screen name="StartScreen" component={StartScreen} />
    //       <Stack.Screen name="LoginScreen" component={LoginScreen} />
    //       <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    //       <Stack.Screen name="Dashboard" component={Dashboard} />
    //       <Stack.Screen
    //         name="ResetPasswordScreen"
    //         component={ResetPasswordScreen}
    //       />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </Provider>

    //liste entreprises
    //     <View style={styles.container}>
    //       <Companies />
    //       <AddCompanies />
    //     </View>
  );
}
