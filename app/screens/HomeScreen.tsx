/// <reference path="../globals.d.ts" />
import React from "react";
import { View, Text, Pressable } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../components/types";
import styles from "../styles";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
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

export default HomeScreen;