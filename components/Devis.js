import { Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import devisApi from "../api/devisApi";
import styles from "../theme/styles";

const Devis = () => {
  const [devis, setDevis] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedDevis = await devisApi.fetchDevis();
      setDevis(fetchedDevis);
    }

    fetchData();
  }, []);
  
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.city}>
        {item.companyName}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Devis</Text>
      <View style={styles.row}>
        <View style={styles.column}>
        <FlatList
            data={devis}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            ></FlatList>
        </View>
      </View>
    </View>
  );
};

export default Devis;
