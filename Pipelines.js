import { Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import pipelinesApi from "./api/pipelinesApi";
import styles from "./theme/styles";

const Pipelines = () => {
  const [pipelines, setPipelines] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedPipelines = await pipelinesApi.fetchPipelines();
      setPipelines(fetchedPipelines);
    }

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.id}</Text>
      <Text style={styles.city}>
        {item.postal_name}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <FlatList
            data={pipelines}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          ></FlatList>
        </View>
      </View>
    </View>
  );
};

export default Pipelines;
