import { Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import ContactApi from "../api/ContactApi";
import styles from "../theme/styles";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const Contact = () => {
  const [contact, setContact] = useState(null);
  const route = useRoute();
  const id = route.params.id;
  console.log("debut contact", id);

  const contactApi = new ContactApi();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        console.log("useeffetc contact", id);

        const response = await axios.get(
          `https://app.idfuse.fr/api/crm/contact/${id}?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78`
        );
        console.log(contact);
        const fetchedContact = response.data;
        setContact(fetchedContact);

      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };
    fetchContact();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {contact ? (
        <>
          <Text style={styles.text}>ID : {id}</Text>
          <Text style={styles.text}>Nom : {contact.contact.last_name}</Text>
          <Text style={styles.text}>Prénom : {contact.contact.first_name}</Text>
        </>
      ) : (
        <Text>Loading contact data...</Text>
      )}
    </ScrollView>
  );
};

export default Contact;
