import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CompanyIcon = ({ color }) => (
  <MaterialCommunityIcons name="domain" color={color} size={20} />
);

const ContactIcon = ({ color }) => (
  <MaterialCommunityIcons name="account-box" color={color} size={20} />
);

const ListIcon = ({ color }) => (
  <MaterialCommunityIcons name="format-list-bulleted" color={color} size={20} />
);

const EmailListIcon = ({ color }) => (
  <MaterialCommunityIcons name="contacts" color={color} size={20} />
);

const EmailIcon = ({ color }) => (
  <MaterialCommunityIcons name="card-account-mail" color={color} size={20} />
);

const CampaignIcon = ({ color }) => (
  <MaterialCommunityIcons name="clipboard-file" color={color} size={20} />
);

const Tab = createMaterialTopTabNavigator();

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (value) => {
    setSearchTerm(value);

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://app.idfuse.fr/api/search?q=${value}&api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78`
        );
        const data = await response.json();

        const filteredResults = data.result.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
      }
    }
  };

  const renderItem = ({ item }) => {
    return <Text style={styles.item}>{item.name}</Text>;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        type="text"
        value={searchTerm}
        onChangeText={(value) => handleSearch(value)}
      />
      {searchResults.length > 0 && searchTerm.length >= 3 ? (
        <Tab.Navigator>
          <Tab.Screen name="ALL">
            {() => (
              <FlatList
                data={searchResults}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                style={{ flex: 1 }}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Entreprises"
            options={{
              tabBarIcon: CompanyIcon,
              tabBarLabel: () => null,
            }}
          >
            {() => (
              <FlatList
                data={searchResults.filter((item) => item.type === "company")}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                style={{ flex: 1 }}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Listes"
            options={{
              tabBarIcon: ListIcon,
              tabBarLabel: () => null,
            }}
          >
            {() => (
              <FlatList
                data={searchResults.filter((item) => item.type === "list")}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Liste d'email"
            options={{
              tabBarIcon: EmailListIcon,
              tabBarLabel: () => null,
            }}
          >
            {() => (
              <FlatList
                data={searchResults.filter(
                  (item) => item.type === "email_list"
                )}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Mail"
            options={{
              tabBarIcon: EmailIcon,
              tabBarLabel: () => null,
            }}
          >
            {() => (
              <FlatList
                data={searchResults.filter(
                  (item) => item.type === "email_contact"
                )}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Contact"
            options={{
              tabBarIcon: ContactIcon,
              tabBarLabel: () => null,
            }}
          >
            {() => (
              <FlatList
                data={searchResults.filter((item) => item.type === "contact")}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Campagnes"
            options={{
              tabBarIcon: CampaignIcon,
              tabBarLabel: () => null,
            }}
          >
            {() => (
              <FlatList
                data={searchResults.filter((item) => item.type === "campaign")}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      ) : (
        <Text>Aucun résultat trouvé.</Text>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 300,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
  },
});
