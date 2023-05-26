import { Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import ContactsApi from "./api/ContactsApi";
import styles from "./theme/styles";

const Contacts = () => {
  const [contact, setContacts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedContacts = await ContactsApi.fetchContacts();
      setContacts(fetchedContacts);
    }

    fetchData();
  }, []);

  // const renderItem = ({ item }) => (
  //   <View style={styles.itemContainer}>
  //     {/* <Text style={styles.name}>{item.name}</Text> */}
  //     <Text style={styles.city}>{item.mail}</Text>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      {contact ? (
        <Text style={styles.name}>{contact.first_name}</Text>
      ) : (
        <Text>No contact found.</Text>
      )}
    </View>
  );
};

export default Contacts;
