import { Text, View, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import companiesApi from "../api/companiesApi";
import styles from "../theme/styles";
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
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handlePress(item)}>
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
      <Text style={styles.city}>
        {item.postal_code} - {item.city}
      </Text>
    </View>
  );

  const handlePress = (item) => {
    navigation.navigate("Company", { id: item.id, name: item.name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des entreprises</Text>
      <View style={styles.row}>
        <View style={styles.column}>
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
