import { Text, View, FlatList, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";
import companiesApi from "./api/companiesApi";
import styles from "./theme/styles";

const AddCompanies = () => {
  const [companies, setCompanies] = useState(null);
  const [newCompany, setNewCompany] = useState({
    name: "",
    postal_code: "",
    city: ""
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
      setNewCompany({ name: "", postalCode: "", city: "" });
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
    <TextInput
      style={styles.input}
      placeholder="Code postal"
      value={newCompany.postalCode}
      onChangeText={(text) =>
        setNewCompany({ ...newCompany, postalCode: text })
      }
    />
    <TextInput
      style={styles.input}
      placeholder="Ville"
      value={newCompany.city}
      onChangeText={(text) => setNewCompany({ ...newCompany, city: text })}
    />

    <Button title="Ajouter" onPress={handleAddCompany} />
  </View>
  );
};

export default AddCompanies;
