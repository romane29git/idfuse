import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import CompanyApi from "../api/companyApi";

const companyApi = new CompanyApi();

const Company = ({ route }) => {
  const [company, setCompany] = useState(null);
  const { name } = route.params;
  const companyId = route.params.id;

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
  }, []);

  return (
    <ScrollView>
      {company ? (
        <>
          <Text style={styles.text}>Entreprise : {name}</Text>
          <Text style={styles.text}>
            Statut :
            {company.status === "customer" ? (
              <Text style={styles.text}> Client</Text>
            ) : (
              <Text style={styles.text}> En réflexion</Text>
            )}
          </Text>

          <Text style={styles.text}>SIREN : {company.siren}</Text>
          <Text style={styles.text}>
            Numéro de compte : {company.account_number}
          </Text>
          <Text style={styles.text}>Adresse : {company.address}</Text>
          <Text style={styles.text}>Ville : {company.city}</Text>
          <Text style={styles.text}>Code postal : {company.postal_code}</Text>
          <Text style={styles.text}>Nb contacts : {company.nb_contacts}</Text>
          {company.contacts.length > 0 && (
            <>
              <Text style={styles.text}>Liste des contacts :</Text>
            </>
          )}
          {company.contacts.map((contact, index) => (
            <View key={index} style={styles.contactContainer}>
              <Text style={styles.contactText}>
                Prénom : {contact.firstName}
              </Text>
              <Text style={styles.contactText}>Nom : {contact.lastName}</Text>
              <Text style={styles.contactText}>Email : {contact.email}</Text>
            </View>
          ))}
          {company.events.length > 0 && (
            <>
              <Text style={styles.text}>Listes des events : </Text>
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
              <Text style={styles.text}>Listes des factures : </Text>
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
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  contactContainer: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    marginBottom: 4,
  },
});
