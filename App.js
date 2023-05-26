import React from "react";
import Companies from "./Companies";
import AddCompanies from "./AddCompanies";
import { View } from "react-native";
import styles from "./theme/styles";
import Contacts from "./Contacts";
import Pipelines from "./Pipelines";

export default function App() {
  return (
    <View style={styles.container}>
      <Companies />
      <AddCompanies />
      <Contacts />
      {/* <Pipelines />  */}
    </View>
  );
}
