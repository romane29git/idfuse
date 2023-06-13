import { Text, View, FlatList, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import companiesApi, { addCompany } from "../api/companiesApi";
import styles from "../theme/styles";
import Button from "./Button";

const AddCompanies = () => {
  const [companies, setCompanies] = useState(null);
  const [newCompany, setNewCompany] = useState({
    name: "",
    city: "",
    postal_code: "",
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
      const companyData = {
        name: newCompany.name,
        city: newCompany.city,
        postal_code: newCompany.postal_code,
        produit: "crm", 
        effectif: "50", 
        secteur: "TEST",
        statut: "customer",
      };
      console.log("Données de l'entreprise :", companyData);
      await addCompany(companyData);
      console.log("Entreprise ajoutée");
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
        placeholder="Ville"
        value={newCompany.city}
        onChangeText={(text) => setNewCompany({ ...newCompany, city: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Code postal"
        value={newCompany.postal_code}
        onChangeText={(text) =>
          setNewCompany({ ...newCompany, postal_code: text })
        }
      />
      <Button mode="outlined" onPress={handleAddCompany}>
        Ajouter
      </Button>
    </View>
  );
};

export default AddCompanies;
