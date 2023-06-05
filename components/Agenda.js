import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { fetchTasks } from "../api/agendaApi";

const Agenda = () => {
  const [task, setTask] = useState("");
  const [tasksList, setTasksList] = useState([]);

  useEffect(() => {
    fetchTasksFromAPI();
  }, []);

  const fetchTasksFromAPI = async () => {
    try {
      const tasks = await fetchTasks();
      setTasksList(tasks);
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches :", error);
    }
  };

  //   const addTask = () => {
  //     if (task.trim() !== "") {
  //       setTasksList([...tasksList, task]);
  //       setTask("");
  //     }
  //   };

  //   const deleteTask = (index) => {
  //     const updatedTasks = [...tasksList];
  //     updatedTasks.splice(index, 1);
  //     setTasksList(updatedTasks);
  //   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda - Aujourd'hui</Text>
      <View style={styles.inputContainer}>
        {/* <TextInput
          style={styles.input}
          placeholder="Nouvelle tâche"
          value={task}
          onChangeText={(text) => setTask(text)}
        /> */}
        {/* <Button title="Ajouter" onPress={addTask} /> */}
      </View>
      {tasksList &&
        tasksList.map((task, index) => (
          <View style={styles.taskContainer} key={index}>
            <Text style={styles.taskText}>{task.title}</Text>
            {/* <Button
      title="Supprimer"
      onPress={() => deleteTask(index)}
      color="#FF0000"
    /> */}
          </View>
        ))}
    </View>
  );
};

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

export default Agenda;
