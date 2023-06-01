import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/LoginHeader";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import App from "../App";

export default function LoginScreen({ navigation }) {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour vérifier si l'utilisateur est connecté au chargement de l'application
  useEffect(() => {
    checkAccessToken();
  }, []);

  // Fonction pour vérifier si l'utilisateur a un token dans le stockage local
  const checkAccessToken = async () => {
    try {
      const storedAccessToken = await AsyncStorage.getItem("accessToken");

      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
      }
    } catch (error) {
      console.log("Erreur lors de la vérification du token :", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour stocker le token dans le stockage local (connexion)
  const storeAccessToken = async (token) => {
    try {
      await AsyncStorage.setItem("accessToken", token);
      setAccessToken(token);
    } catch (error) {
      console.log("Erreur de stockage du token :", error);
    }
  };

  // Fonction pour supprimer le token du stockage local (déconnexion)
  const removeAccessToken = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      setAccessToken(null);
    } catch (error) {
      console.log("Erreur lors de la suppression du token :", error);
    }
  };

  // Fonction pour se connecter et obtenir le token depuis l'API
  const login = async () => {
    try {
      // Effectuer une requête à l'API pour obtenir le token
      const response = await fetch(
        "https://app.idfuse.fr/api/sso?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78&sso_user=democlients",
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (data.success === 1) {
        const accessToken = data.sso_token;
        storeAccessToken(accessToken);
        console.log("Connexion réussie");
      } else {
        console.log("Échec de la connexion :", data.result_message);
      }
    } catch (error) {
      console.log("Erreur lors de la connexion :", error);
    }
  };

  // // Fonction pour effectuer une action lorsque l'utilisateur est connecté
  // const performActionWhenLoggedIn = () => {
  //   // Effectuer l'action souhaitée lorsque l'utilisateur est connecté
  //   console.log("Utilisateur connecté. Effectuer l'action souhaitée ici.");
  // };

  if (isLoading) {
    // Afficher un indicateur de chargement pendant la vérification du token
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  //--------------------------------------------------------------------------------------------------------------------

  if (!accessToken) {
    // L'utilisateur n'est pas connecté, afficher l'interface de connexion
    return (
      <Background>
        <BackButton goBack={() => navigation.goBack()} />
        <Logo />
        <Header>Welcome back.</Header>
        <TextInput
          label="Email"
          // returnKeyType="next"
          // value={email.value}
          // onChangeText={(text) => setEmail({ value: text, error: "" })}
          // error={!!email.error}
          // errorText={email.error}
          // autoCapitalize="none"
          // autoCompleteType="email"
          // textContentType="emailAddress"
          // keyboardType="email-address"
        />
        <TextInput
          label="Password"
          // returnKeyType="done"
          // value={password.value}
          // onChangeText={(text) => setPassword({ value: text, error: "" })}
          // error={!!password.error}
          // errorText={password.error}
          // secureTextEntry
        />
        <View style={styles.forgotPassword}>
          <Text
            style={styles.forgot}
            onPress={() => navigation.navigate("ResetPasswordScreen")}
          >
            Forgot your password?
          </Text>
        </View>
        <Button mode="contained" onPress={login}>
          <Text>Login</Text>
        </Button>
        <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.replace("RegisterScreen")}
          >
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Background>
    );
  }
   else {
    return (
      <App/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 30,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 50,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
