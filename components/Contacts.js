import { Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import ContactsApi from "../api/ContactsApi";
import styles from "../theme/styles";

const Contacts = () => {
  const [contact, setContacts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedContacts = await ContactsApi.fetchContacts();
      setContacts(fetchedContacts);
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {contact ? (
        <Text style={styles.name}>{contact.mail}</Text>
      ) : (
        <Text>No contact found.</Text>
      )}
    </View>
  );
};

export default Contacts;
