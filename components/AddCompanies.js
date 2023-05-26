import { Text, View, FlatList, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import companiesApi from "../api/companiesApi";
import styles from "../theme/styles";
import Button from "./Button";

const AddCompanies = () => {
  const [companies, setCompanies] = useState(null);
  const [newCompany, setNewCompany] = useState({
    name: "",
  });

  useEffect(() => {
    async function fetchData() {
      const fetchedCompanies = await companiesApi.fetchCompanies();
      setCompanies(fetchedCompanies);
    }

    fetchData();
  }, []);



  const handleAddCompany = async () => {
    try {
      // Appel à l'api
      await companiesApi.addCompany(newCompany);

      // Ajout nouvelle entreprise
      setCompanies([...companies, newCompany]);

      // Réinitialiser formulaire
      setNewCompany({ name: ""});
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'entreprise :", error);
    }
  };

  return (
    <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Nom de l'entreprise"
      value={newCompany.name}
      onChangeText={(text) => setNewCompany({ ...newCompany, name: text })}
    />
    <Button mode="outlined" onPress={handleAddCompany}>Ajouter</Button>
  </View>
  );
};

export default AddCompanies;
