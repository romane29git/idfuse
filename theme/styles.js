import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 50,
    },
    row: {
      flex: 1,
      padding: 10,
      marginLeft: "5%",
      flexDirection: "row",
      
    },
    column: {
      flex: 1,
      paddingHorizontal: 10,
    },
    itemContainer: {
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    name: {
      flex: 1,
      marginRight: 10,
      fontWeight: "bold",
    },
    city: {
      flex: 1,
    },
  });

  export default styles;