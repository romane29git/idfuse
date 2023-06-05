import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { Card } from "react-native-elements";
import { View, Text, ScrollView } from "react-native";
import moment from "moment";
import "moment/locale/fr";
import styles from "../theme/styles";
import companiesApi from "../api/companiesApi";

export default function Dashboard({ navigation }) {
  const [companyCount, setCompanyCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchCompanyData();
    const interval = setInterval(fetchCompanyData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchCompanyData = async () => {
    try {
      const companies = await companiesApi.fetchCompanies();
      setCompanyCount(companies.length);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Erreur lors de la récupération des entreprises :", error);
    }
  };

  const formatLastUpdated = () => {
    if (lastUpdated) {
      moment.locale("fr");
      return moment(lastUpdated).fromNow();
    }
    return "";
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Nombre d'entreprises
            </Text>
            <Text style={{ fontSize: 14, color: "gray" }}>
              {formatLastUpdated()}
            </Text>
          </View>
          <Card.Divider />
          <Text>{companyCount}</Text>
        </Card>

        <Card>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Nombre de factures
            </Text>
            <Text style={{ fontSize: 14, color: "gray" }}>
              {formatLastUpdated()}
            </Text>
          </View>
          <Card.Divider />
          <Text>nb factures</Text>
        </Card>

        <Card>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Card Title 3
            </Text>
            <Text style={{ fontSize: 14, color: "gray" }}>Card Subtitle</Text>
          </View>
          <Card.Divider />
          <Card.Image source={require("../assets/splash.png")} />
          <Card.Divider />
          <Text>Card content</Text>
          <Button mode="outlined">Ok</Button>
          <Button mode="outlined">Cancel</Button>
        </Card>

        <Card>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Card Title 4
            </Text>
            <Text style={{ fontSize: 14, color: "gray" }}>Card Subtitle</Text>
          </View>
          <Card.Divider />
          <Card.Image source={require("../assets/splash.png")} />
          <Card.Divider />
          <Text>Card content</Text>
          <Button mode="outlined">Ok</Button>
          <Button mode="outlined">Cancel</Button>
        </Card>
      </ScrollView>

      {/* <Button mode="outlined">Logout</Button> */}
    </View>
  );
}
