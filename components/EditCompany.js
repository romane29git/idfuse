import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Company, editCompanyApi } from "../api/editCompanyApi";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import CompanyApi from "../api/companyApi";

const companyApi = new CompanyApi();

const EditCompany = ({ route }) => {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [street_number, setStreetNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState({});
  const navigation = useNavigation();
  const idCompany = route.params.id;

  useEffect(() => {
    async function fetchCompanyDetails() {
      try {
        const fetchedCompany = await companyApi.getCompanyById(idCompany);
        setCompany(fetchedCompany);

        console.log(fetchedCompany);

        setName(fetchedCompany.name);
        setStreet(fetchedCompany.street);
        setStreetNumber(fetchedCompany.street_number);
        setCity(fetchedCompany.city);
        setCountry(fetchedCompany.country);
      } catch (error) {
        console.log("Error fetching company data:", error);
      }
    }

    fetchCompanyDetails();
  }, [idCompany]);


  const handleSubmit = async () => {
    try {
      await editCompanyApi({
        id: idCompany,
        name,
        street_number,
        street,
        city,
        country,
        idAddress : company.idAddress,
      });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la modification de l'entreprise :",
        error
      );
    }
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
      <Text>Modifier l'entreprise</Text>
      <TextInput placeholder="Nom" value={name} onChangeText={setName} />
      <TextInput placeholder="Numéro" value={street_number} onChangeText={setStreetNumber} />
      <TextInput placeholder="Rue" value={street} onChangeText={setStreet} />
      <TextInput placeholder="Ville" value={city} onChangeText={setCity} />
      <TextInput placeholder="Pays" value={country} onChangeText={setCountry} />
      <Button title="Modifier" onPress={handleSubmit} />
    </View>
  );
};

export default EditCompany;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
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
