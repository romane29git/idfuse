import { Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import ContactsApi from "./api/ContactsApi";
import styles from "./theme/styles";

const Contacts = () => {
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedContacts = await ContactsApi.fetchContacts();
      setContacts(fetchedContacts);
    }

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.last_name}</Text>
      <Text style={styles.city}>{item.q}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>
    </View>
  );
};

export default Contacts;
