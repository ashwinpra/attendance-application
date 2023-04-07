import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../components/types";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    // make a container for the login page
    <View style={styles.background}>
      <Text style={styles.welcomeText}>Welcome!</Text>

      <Pressable
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login", { userType: "student" })}
      >
        <Text style={styles.loginText}>Student</Text>
      </Pressable>

      <Pressable
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login", { userType: "teacher" })}
      >
        <Text style={styles.loginText}>Teacher</Text>
      </Pressable>

      <Pressable
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login", { userType: "admin" })}
      >
        <Text style={styles.loginText}>Admin</Text>
      </Pressable>

      {/* Add option for new user registration */}
      <Pressable
        style={styles.registerButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.loginText}>New User? Register here</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  welcomeText: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },

  loginButton: {
    backgroundColor: "#1e88e5",
    width: "80%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    margin: 10,
  },

  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  registerButton: {
    backgroundColor: "#1e88e5",
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    marginVertical: 25,
  },
});
