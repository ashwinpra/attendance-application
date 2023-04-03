import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../components/types";

type Props = {
  navigation: NavigationProp<RootStackParamList, "THome">;
};

interface User {
  name: string;
  // rollno: string;   // not needed
  profileImage: string;
}

const userData: User = {
  name: "John Doe",
  profileImage: "./profile-picture.jpg",
};

const TeacherHome: React.FC<Props> = ({ navigation }) => {
  //const navigation = useNavigation();

  const [user, setUser] = useState<User>(userData);

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
      <View style={styles.userContainer}>
        {user.profileImage ? (
          <Image
            source={{ uri: user.profileImage }}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={require("../assets/default-user.png")}
            style={styles.profileImage}
          />
        )}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>Welcome back, {user.name}!</Text>
        </View>
        <View style={styles.settingsButton}>
          <TouchableOpacity onPress={navigateToSettings}>
            <Image
              source={require("../assets/setting.png")}
              style={styles.settingsIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={startAttendance}>
          <Text style={styles.buttonText}>Start Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToCourses}>
          <Text style={styles.buttonText}>View Courses</Text>
        </TouchableOpacity>
      </View>
      {/*<View style={styles.footer}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={navigateToSettings}
          >
            <Text style={styles.settingsButtonText}>Settings</Text>
          </TouchableOpacity>
        </View>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "#008CBA",
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
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
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
  settingsIcon: {
    width: 30,
    height: 30,
  },
  userInfoContainer: {
    flex: 1,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default TeacherHome;
