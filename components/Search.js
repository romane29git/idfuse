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
          <Tab.Screen name="Entreprises">
            {() => (
              <FlatList
                data={searchResults.filter((item) => item.type === "company")}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Listes">
            {() => (
              <FlatList
                data={searchResults.filter((item) => item.type === "list")}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Liste d'email">
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

          <Tab.Screen name="Mail">
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

          <Tab.Screen name="Contact">
            {() => (
              <FlatList
                data={searchResults.filter((item) => item.type === "contact")}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Campagnes">
            {() => (
              <FlatList
                data={searchResults.filter((item) => item.type === "campaign")}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Autres">
            {() => (
              <FlatList
                data={searchResults.filter(
                  (item) =>
                    item.type !== "company" &&
                    item.type !== "list" &&
                    item.type !== "email_list" &&
                    item.type !== "email_contact" &&
                    item.type !== "contact" &&
                    item.type !== "campaign"
                )}
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
  button: {
    backgroundColor: "#2980b9",
    paddingVertical: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
  },
});
