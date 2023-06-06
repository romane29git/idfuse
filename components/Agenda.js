import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import AgendaApi from "../api/agendaApi"; 

const agendaApi = new AgendaApi();

const Agenda = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const allEvents = await agendaApi.getAllEvents();

        const todayEvents = allEvents.filter((event) => {
          const eventDate = new Date(event.date_start); 
          const today = new Date();
          return (
            eventDate.getDate() === today.getDate() &&
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear()
          );
        });

        const pastEvents = allEvents.filter((event) => {
          const eventDate = new Date(event.end);
          const today = new Date();
          return eventDate < today;
        });

        const allEventsToday = [...todayEvents, ...pastEvents];
        setEvents(allEventsToday);
      } catch (error) {
        console.log("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda</Text>
      {events.length > 0 ? (
        events.map((event, index) => (
          <View key={index}>
            <Text>Event Name: {event.title}</Text>
          </View>
        ))
      ) : (
        <Text>No events today</Text>
      )}
    </View>
  );
};

export default Agenda;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
});
