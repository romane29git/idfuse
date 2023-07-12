import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { editCompanyApi } from "../api/editCompanyApi";

function EditCompany() {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async () => {
    try {
      await editCompanyApi({
        id: "24",
        name,
        street,
        city,
        country,
      });
      console.log("ok");
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la modification de l'entreprise :",
        error
      );
    }
  };

  return (
    <View>
      <Text>Modifier l'entreprise</Text>
      <TextInput placeholder="Nom" value={name} onChangeText={setName} />
      <TextInput placeholder="Rue" value={street} onChangeText={setStreet} />
      <TextInput placeholder="Ville" value={city} onChangeText={setCity} />
      <TextInput placeholder="Pays" value={country} onChangeText={setCountry} />
      <Button title="Modifier" onPress={handleSubmit} />
    </View>
  );
}

export default EditCompany;
