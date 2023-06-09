import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import ContactApi from "../api/ContactApi";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const Contact = () => {
  const [contact, setContact] = useState(null);
  const route = useRoute();
  const id = route.params.id;
  const navigation = useNavigation();

  const contactApi = new ContactApi();

  const updateContactId = (newId) => {
    navigation.setParams({ id: newId });
  };
  

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(
          `https://app.idfuse.fr/api/crm/contact/${id}?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78`
        );
        const fetchedContact = response.data;
        setContact(fetchedContact);
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };
    fetchContact();
  }, [id]);

  const handlePress = (newId) => {
    updateContactId(newId);
  };
  

  return (
    <ScrollView style={styles.container}>
      {contact ? (
        <>
          <Text style={styles.sectionTitle}>
            {contact.contact.first_name} {contact.contact.last_name}
          </Text>
          {contact.contact.emails && contact.contact.emails.length > 0 && (
            <>
              <Text style={styles.title}>Mail</Text>
              {contact.contact.emails.map((contact, index) => (
                <View key={index} style={styles.contactContainer}>
                  <Text style={styles.contactText}>{contact.mail}</Text>
                </View>
              ))}
            </>
          )}

          {contact.contact.companies &&
            contact.contact.companies.length > 0 && (
              <>
                <Text style={styles.title}>Entreprises</Text>
                {contact.contact.companies.map((company, index) => (
                  <View key={index} style={styles.contactContainer}>
                    <Text style={styles.contactText}>{company.name}</Text>
                  </View>
                ))}
              </>
            )}

          {contact.contact.contacts && contact.contact.contacts.length > 0 && (
            <>
              <Text style={styles.title}>Contacts</Text>
              {contact.contact.contacts.map((contact, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handlePress(contact.id)}
                >
                  <View key={index} style={styles.contactContainer}>
                    <Text style={styles.contactText}>
                      {contact.first_name} {contact.last_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {contact.contact.opportunities &&
            contact.contact.opportunities.length > 0 && (
              <>
                <Text style={styles.title}>Opportunités</Text>
                {contact.contact.opportunities.map((contact, index) => (
                  <View key={index} style={styles.contactContainer}>
                    <Text style={styles.contactText}>{contact.name}</Text>
                  </View>
                ))}
              </>
            )}
        </>
      ) : (
        <Text>Loading contact data...</Text>
      )}
    </ScrollView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  contactContainer: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  contactText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  title: {
    fontSize: 19,
    marginBottom: 8,
    color: "#333",
    fontWeight: "bold",
  },
  customer: {
    backgroundColor: "#1ccf60",
    borderRadius: 15,
  },
  prospect: {
    backgroundColor: "#68bae8",
    borderRadius: 15,
  },
  statut: {
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
    margin: 6,
  },
});
