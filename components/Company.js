import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CompanyApi from "../api/companyApi";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

const companyApi = new CompanyApi();

const Company = ({ route }) => {
  const [company, setCompany] = useState(null);
  const companyId = route.params.id;
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchCompanyData() {
      try {
        const fetchedCompany = await companyApi.getCompanyById(companyId);
        setCompany(fetchedCompany);
      } catch (error) {
        console.log("Error fetching company data:", error);
      }
    }

    fetchCompanyData();
  }, [companyId]);

  const handlePress = (contact) => {
    navigation.navigate("Contact", { id: contact.contactId });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../assets/arrow_back.png")}
          style={styles.backArrow}
        />
      </TouchableOpacity>
      {company ? (
        <>
          <Text style={styles.sectionTitle}>{company.name}</Text>
          <Text style={styles.text}>
            {company.status === "customer" ? (
              <View style={styles.customer}>
                <Text style={styles.statut}>customer</Text>
              </View>
            ) : (
              <View style={styles.prospect}>
                <Text style={styles.statut}>cold prospect</Text>
              </View>
            )}
          </Text>
          <Text style={styles.text}>SIREN : {company.siren}</Text>
          <Text style={styles.text}>
            Numéro de compte : {company.account_number}
          </Text>
          <Text style={styles.text}>Adresse : {company.address}</Text>
          <Text style={styles.text}>{company.nb_contacts} contact(s)</Text>
          {company.contacts.length > 0 && (
            <>
              <Text style={styles.title}>Liste des contacts :</Text>
            </>
          )}
          {company.contacts.map((contact, index) => (
            <TouchableOpacity key={index} onPress={() => handlePress(contact)}>
              <View key={index} style={styles.contactContainer}>
                <Text style={styles.contactText}>
                  Prénom : {contact.firstName}
                </Text>
                <Text style={styles.contactText}>Nom : {contact.lastName}</Text>
                <Text style={styles.contactText}>Email : {contact.email}</Text>
              </View>
            </TouchableOpacity>
          ))}
          {company.events.length > 0 && (
            <>
              <Text style={styles.title}>Listes des events : </Text>
            </>
          )}
          {company.events.map((event, index) => (
            <View key={index} style={styles.contactContainer}>
              <Text style={styles.contactText}>Event : {event.event_name}</Text>
              <Text style={styles.contactText}>
                Date de début : {event.event_date_start}
              </Text>
              <Text style={styles.contactText}>
                Date de fin : {event.event_date_end}
              </Text>
              <Text style={styles.contactText}>Type : {event.event_type}</Text>
            </View>
          ))}

          {company.invoices.length > 0 && (
            <>
              <Text style={styles.title}>Listes des factures : </Text>
            </>
          )}
          {company.invoices.map((invoice, index) => (
            <View key={index} style={styles.contactContainer}>
              <Text style={styles.contactText}>Numéro : {invoice.number}</Text>
              <Text style={styles.contactText}>Statut : {invoice.status}</Text>
              <Text style={styles.contactText}>
                Date : {invoice.invoice_date}
              </Text>
              <Text style={styles.contactText}>Montant : {invoice.amount}</Text>
            </View>
          ))}
        </>
      ) : (
        <Text>Loading company data...</Text>
      )}
    </ScrollView>
  );
};

export default Company;

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
  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  backArrow: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});
