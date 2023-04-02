import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList }  from "../components/types";

type Props = {
  navigation: NavigationProp<RootStackParamList, 'THome'>;
}

const TeacherHome: React.FC<Props> = ({ navigation }) => {
  //const navigation = useNavigation();

  const startAttendance = () => {
    // code to start attendance
  };

  const navigateToCourses = () => {
    navigation.navigate("Courses");
  };

  const navigateToSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Teacher Home</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={startAttendance}>
          <Text style={styles.buttonText}>Start Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToCourses}>
          <Text style={styles.buttonText}>View Courses</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={navigateToSettings}
        >
          <Text style={styles.settingsButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 50,
    backgroundColor: "#3f51b5",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "#3f51b5",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    height: 50,
    backgroundColor: "#3f51b5",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  settingsButton: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  settingsButtonText: {
    color: "#3f51b5",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TeacherHome;
