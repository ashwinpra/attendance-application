import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function StudentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Attendance Records</Text>
      <Text style={styles.text}>Mark Attendance</Text>
      <Text style={styles.text}>Enrolled Courses</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
});
