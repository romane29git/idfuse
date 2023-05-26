import React from "react";
import Header from "./components/Header";
import Companies from "./components/Companies";
import AddCompanies from "./components/AddCompanies";
import { View, Text } from "react-native";
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

      {/* <Companies />
     <AddCompanies /> */}

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

   
  );
}
