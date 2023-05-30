import React, { useState } from "react";
import { View, Button } from "react-native";
import styles from "./theme/styles";
import RootTabNavigator from "./navigation/RootTabNavigator";
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { Provider } from "react-native-paper";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { theme } from "./core/theme";

// const Stack = createStackNavigator();

export default function App() {
  const [accessToken, setAccessToken] = useState(null);

  // Fonction pour stocker le jeton d'accès dans le stockage local
  const storeAccessToken = async (token) => {
    try {
      await AsyncStorage.setItem("accessToken", token);
      setAccessToken(token);
    } catch (error) {
      console.log("Erreur de stockage du jeton d'accès :", error);
    }
  };

  // Fonction pour supprimer le jeton d'accès du stockage local
  const removeAccessToken = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      setAccessToken(null);
    } catch (error) {
      console.log("Erreur lors de la suppression du jeton d'accès :", error);
    }
  };

  // Exemple de fonction pour se connecter et obtenir le jeton d'accès depuis l'API
  const login = async () => {
    try {
      // Effectuer une requête à votre API pour obtenir le jeton d'accès
      const response = await fetch("https://app.idfuse.fr/api/sso?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78&sso_user=democlients", {
        method: "GET",
        // body: JSON.stringify({
        //   username: "votre_nom_utilisateur",
        //   password: "votre_mot_de_passe",
        // }),
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });

      const data = await response.json();

      if (data.success === 1) {
        const accessToken = data.sso_token;
        storeAccessToken(accessToken);
      } else {
        console.log("Échec de la connexion :", data.result_message);
      }
    } catch (error) {
      console.log("Erreur lors de la connexion :", error);
    }
  };

  // Exemple de fonction pour effectuer une requête authentifiée à votre API en utilisant le jeton d'accès
  const fetchData = async () => {
    try {
      const storedAccessToken = await AsyncStorage.getItem("accessToken");

      if (storedAccessToken) {
        // Utilisez le jeton d'accès pour authentifier votre requête
        const response = await fetch("https://app.idfuse.fr/api/sso?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78&sso_user=democlients", {
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
        });

        const data = await response.json();

        console.log("Données récupérées :", data);
      } else {
        console.log(
          "Aucun jeton d'accès trouvé. L'utilisateur n'est pas connecté."
        );
      }
    } catch (error) {
      console.log("Erreur lors de la récupération des données :", error);
    }
  };

  return (
    <View style={styles.container}>
      {accessToken ? (
        <Button title="Déconnexion" onPress={removeAccessToken} />
      ) : (
        <Button title="Se connecter" onPress={login} />
      )}

      <Button title="Récupérer des données" onPress={fetchData} />
    </View>

    // <RootTabNavigator />
    // <View style={styles.container}>
    //   <Header />

    //page login
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

    // </View>
  );
}
