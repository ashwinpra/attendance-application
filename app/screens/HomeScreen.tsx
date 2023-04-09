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
        <Text style={styles.registerText}>New User? Register here</Text>
      </Pressable>
      <View style={styles.footer}>
        <Text>Made by Team SAY_YAS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingTop: 100,
  },

  welcomeText: {
    color: "#212121",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  loginButton: {
    backgroundColor: "#1e88e5",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#082e57",
    marginVertical: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
  },

  loginText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  registerButton: {
    backgroundColor: "#1e88e5",
    width: "80%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#082e57",
    marginVertical: 25,
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
  },
  registerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  separator: {
    height: 20,
  },

  footer: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    flex: 1,
    justifyContent: "flex-end",
  },
});
