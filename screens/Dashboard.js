import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { Card } from "react-native-elements";
import { View, Text, ScrollView } from "react-native";

export default function Dashboard({ navigation }) {
  return (
    <ScrollView>
      <Button mode="outlined">Logout</Button>
      <Card>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Card Title</Text>
          <Text style={{ fontSize: 14, color: "gray" }}>Card Subtitle</Text>
        </View>
        <Card.Divider />
        <Card.Image source={require("../assets/splash.png")} />
        <Card.Divider />
        <Button mode="outlined">Ok</Button>
        <Button mode="outlined">Cancel</Button>
      </Card>

      <Card>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Card Title 2{" "}
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Card Title</Text>
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Card Title</Text>
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
  );
}