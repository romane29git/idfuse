import { Text, View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { companiesApiInstance, fetchCompanies } from "../api/addCompaniesApi";
import addCompany from "../api/addCompaniesApi";
import styles from "../theme/styles";
import Button from "./Button";

const AddCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: "",
    street: "",
    city: "",
    postal_code: "",
    country: "",
    cusstomer_address: "",
  });

  const fetchData = async () => {
    try {
      const fetchedCompanies = await companiesApiInstance.fetchCompanies(); // Utiliser la méthode fetchCompanies de l'instance
      setCompanies(fetchedCompanies);
    } catch (error) {
      console.error("Erreur lors de la récupération des entreprises :", error);
    }
  };

  const handleAddCompany = async () => {
    try {
      const { name, street, city, postal_code, country } = newCompany;

      const companyData = {
        name: name,
        addresses: [
          {
            street: street,
            city: city,
            postal_code: postal_code,
            country: country,
            customer_address: street+", "+city,
          },
        ],
      };

      console.log("Données de l'entreprise :", companyData);

      // Appeler la méthode pour ajouter une entreprise
      await addCompany(companyData);

      // // Réinitialiser les valeurs des champs de saisie
      // setNewCompany({
      //   name: "",
      //   street: "",
      //   city: "",
      //   postal_code: "",
      //   country: "",
      // });

      // Rafrtaîchir la liste des entreprises
      fetchData();
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
        onChangeText={(text) =>
          setNewCompany({
            ...newCompany,
            name: text,
          })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Rue"
        value={newCompany.street}
        onChangeText={(text) =>
          setNewCompany({
            ...newCompany,
            street: text,
          })
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Ville"
        value={newCompany.city}
        onChangeText={(text) =>
          setNewCompany({
            ...newCompany,
            city: text,
          })
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Code postal"
        value={newCompany.postal_code}
        onChangeText={(text) =>
          setNewCompany({
            ...newCompany,
            postal_code: text,
          })
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Pays"
        value={newCompany.country}
        onChangeText={(text) =>
          setNewCompany({
            ...newCompany,
            country: text,
          })
        }
      />

      <Button mode="outlined" onPress={handleAddCompany}>
        Ajouter
      </Button>

      <View>
        {companies.map((company) => (
          <Text key={company.id}>{company.name}</Text>
        ))}
      </View>
    </View>
  );
};

export default AddCompanies;
