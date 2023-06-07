import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import companiesApi from "../api/companiesApi";
import { useNavigation } from "@react-navigation/native";

const Companies = () => {
  const [companies, setCompanies] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      const fetchedCompanies = await companiesApi.fetchCompanies();
      setCompanies(fetchedCompanies);
    }

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>

    <View style={styles.itemContainer}>
        <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.city}>
        {item.postal_code} - {item.city}
      </Text>
      <Text style={styles.info}>Produits : {item.produit}</Text>
      <Text style={styles.info}>
        Effectif de l'entreprise : {item.effectif}
      </Text>
      <Text style={styles.info}>
        {item.statut === "customer" ? (
          <View style={styles.customer}>
            <Text style={styles.statut}>{item.statut}</Text>
          </View>
        ) : (
          <View style={styles.prospect}>
            <Text style={styles.statut}>{item.statut}</Text>
          </View>
        )}
      </Text>
    </View>
    </TouchableOpacity>

  );

  const handlePress = (item) => {
    navigation.navigate("Company", { id: item.id, name: item.name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des entreprises</Text>
      <View>
        <View>
          <FlatList
            data={companies}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          ></FlatList>
        </View>
      </View>
    </View>
  );
};

export default Companies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 30,
  },
  itemContainer: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  city: {
    fontSize: 16,
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
    fontStyle: "italic",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  customer: {
    backgroundColor: "#1ccf60",
    borderRadius: 15,
  },
  prospect: {
    backgroundColor: "#68bae8",
    borderRadius: 15,
  },
  statut: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    margin: 6,
  },
});