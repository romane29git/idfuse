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

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (value) => {
    setSearchTerm(value);

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://app.idfuse.fr/api/search?q=${searchTerm}&api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78`
        );
        const data = await response.json();

        const filteredResults = data.result.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
      }
    }
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
        <View>
          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              if (item.type === "company") {
                return <Text style={styles.item}>{item.name}</Text>;
              }
              return null;
            }}
            ListHeaderComponent={<Text>Entreprises :</Text>}
          />

          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              if (item.type === "list") {
                return <Text style={styles.item}>{item.name}</Text>;
              }
              return null;
            }}
            ListHeaderComponent={<Text>Listes :</Text>}
          />

          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              if (item.type === "email_list") {
                return <Text style={styles.item}>{item.name}</Text>;
              }
              return null;
            }}
            ListHeaderComponent={<Text>Liste d'email :</Text>}
          />

          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              if (item.type === "email_contact") {
                return <Text style={styles.item}>{item.name}</Text>;
              }
              return null;
            }}
            ListHeaderComponent={<Text>Mail :</Text>}
          />

          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              if (item.type === "contact") {
                return <Text style={styles.item}>{item.name}</Text>;
              }
              return null;
            }}
            ListHeaderComponent={<Text>Contact :</Text>}
          />

          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              if (item.type === "campaign") {
                return <Text style={styles.item}>{item.name}</Text>;
              }
              return null;
            }}
            ListHeaderComponent={<Text>Campagnes :</Text>}
          />

          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              if (
                item.type != "company" &&
                item.type != "list" &&
                item.type != "email_list" &&
                item.type != "email_contact" &&
                item.type != "contact" &&
                item.type != "campaign"
              ) {
                return <Text style={styles.item}>{item.name}</Text>;
              }
              return null;
            }}
            ListHeaderComponent={<Text>Autres :</Text>}
          />
        </View>
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
