import { Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import ContactsApi from "../api/ContactsApi";
import styles from "../theme/styles";
import axios from "axios";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("https://app.idfuse.fr/api/crm/contact/search_email/?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78&q=neva.dupont@idfuse.fr");
        const { items } = response.data;
        setContacts(items);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  return (
    <FlatList
      data={contacts}
      keyExtractor={(contact) => contact.mail}
      renderItem={({ item }) => <Text>{item.mail}</Text>}
    />
  );
};

export default Contacts;
