import { Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import companiesApi from "../api/companiesApi";
import styles from "../theme/styles";

const Companies = () => {
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedCompanies = await companiesApi.fetchCompanies();
      setCompanies(fetchedCompanies);
    }

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.city}>
        {item.postal_code} - {item.city}
      </Text>
    </View>
  );

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
