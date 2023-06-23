import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { Modal } from "react-native";
import Map from "../components/Map";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

import CompanyApi from "../api/companyApi";

const companyApi = new CompanyApi();
const Tab = createMaterialTopTabNavigator();

const Company = ({ route }) => {
  const [company, setCompany] = useState(null);
  const companyId = route.params.id;
  const navigation = useNavigation();
  const [isMapVisible, setIsMapVisible] = useState(false);

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

  const handleAddress = (address) => {
    setIsMapVisible(true);
  };

  const ContactTab = () => {
    const contacts = company ? company.contacts : [];

    return (
      <View style={styles.tabContainer}>
        {contacts.length > 0 ? (
          contacts.map((contact, index) => (
            <TouchableOpacity key={index} onPress={() => handlePress(contact)}>
              <View style={styles.contactContainer}>
                <Text style={styles.contactText}>
                  Prénom : {contact.firstName}
                </Text>
                <Text style={styles.contactText}>Nom : {contact.lastName}</Text>
                <Text style={styles.contactText}>Email : {contact.email}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Aucun contact disponible</Text>
        )}
      </View>
    );
  };

  const EventTab = () => {
    const events = company ? company.events : [];

    return (
      <View style={styles.tabContainer}>
        {events.length > 0 ? (
          events.map((event, index) => (
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
          ))
        ) : (
          <Text>Aucun événement disponible</Text>
        )}
      </View>
    );
  };

  const InvoiceTab = () => {
    const invoices = company ? company.invoices : [];

    return (
      <View style={styles.tabContainer}>
        {invoices.length > 0 ? (
          invoices.map((invoice, index) => (
            <View key={index} style={styles.contactContainer}>
              <Text style={styles.contactText}>Numéro : {invoice.number}</Text>
              <Text style={styles.contactText}>Statut : {invoice.status}</Text>
              <Text style={styles.contactText}>
                Date : {invoice.invoice_date}
              </Text>
              <Text style={styles.contactText}>
                Montant : {invoice.amount}€
              </Text>
            </View>
          ))
        ) : (
          <Text>Aucune facture disponible</Text>
        )}
      </View>
    );
  };

  const getTabBarIcon = (route, focused) => {
    let iconName;

    switch (route.name) {
      case "Contacts":
        iconName = "users";
        break;
      case "Events":
        iconName = "calendar";
        break;
      case "Factures":
        iconName = "euro";
        break;
    }

    return (
      <Icon
        name={iconName}
        size={focused ? 24 : 20}
        color={focused ? "#333" : "#888"}
      />
    );
  };

  return (
    <View style={styles.container}>
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
          {company && company.address && (
            <TouchableOpacity onPress={() => handleAddress(company.address)}>
              <Text style={styles.text}>Adresse : {company.address}</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.text}>{company.nb_contacts} contact(s)</Text>
        </>
      ) : (
        <Text>Loading company data...</Text>
      )}

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => getTabBarIcon(route, focused),
          tabBarLabel: () => null,
        })}
      >
        <Tab.Screen name="Contacts" component={ContactTab} />
        <Tab.Screen name="Events" component={EventTab} />
        <Tab.Screen name="Factures" component={InvoiceTab} />
      </Tab.Navigator>

      <Modal
        visible={isMapVisible}
        transparent={true}
        onRequestClose={() => setIsMapVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsMapVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
          <View style={styles.mapContainer}>
            {company && company.address && <Map address={company.address} />}
          </View>
        </View>
      </Modal>
    </View>
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
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#ccc",
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
    elevation: 5,
  },
  closeButtonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  mapContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  tabContainer: {
    flex: 1,
    padding: 16,
  },
  tabBar: {
    backgroundColor: "#fff",
  },
  tabIndicator: {
    backgroundColor: "#333",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 16,
    color: "#333",
  },
  activeTabText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
