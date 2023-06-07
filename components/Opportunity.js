import { Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import opportunityApi from "../api/opportunityApi";
import styles from "../theme/styles";

const Opportunity = () => {
  const [opportunity, setOpportunity] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedOpportunity = await opportunityApi.fetchOpportunity();
      setOpportunity(fetchedOpportunity);
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
      <Text style={styles.title}>Opportunity</Text>
      <View style={styles.row}>
        <View style={styles.column}>
        <FlatList
            data={opportunity}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            ></FlatList>
        </View>
      </View>
    </View>
  );
};

export default Opportunity;
