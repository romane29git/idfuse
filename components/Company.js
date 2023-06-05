import { Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import companiesApi from "../api/companiesApi";
import styles from "../theme/styles";

const Company = () => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedCompany = await companiesApi.fetchCompany();
      setCompany(fetchedCompany);
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
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.row}>
        <Text style={styles.city}>
          {item.postal_code} - {item.city}
        </Text>
      </View>
    </View>
  );
};

export default Company;
