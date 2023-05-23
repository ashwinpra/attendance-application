/// <reference path="app/globals.d.ts" />
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "./app/screens/HomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegistrationScreen from "./app/screens/RegistrationScreen";
import StudentHome from "./app/screens/homepages/StudentHome";
import TeacherHome from "./app/screens/homepages/TeacherHome";
import AdminHome from "./app/screens/homepages/AdminHome";
import StudentCourse from "./app/screens/coursepages/StudentCourse";
import TeacherCourse from "./app/screens/coursepages/TeacherCourse";
import AdminCourse from "./app/screens/coursepages/AdminCourse";
import Settings from "./app/screens/Settings";
import { RootStackParamList } from "./app/components/types";

const Stack = createNativeStackNavigator<RootStackParamList>();


const setStackOptions = (title: string) => {
  return {
    // options to be passed to the navigator
    headerStyle: {
      backgroundColor: "#1e88e5",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 18,
    },
    headerTitle: title,
    headerTitleAlign: "center",
    headerLeft: () => null
  };
}

export default function App() {
    
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="SHome" component={StudentHome} options={setStackOptions("Home")}/>
        <Stack.Screen name="THome" component={TeacherHome} options={setStackOptions("Home")}/>
        <Stack.Screen name="AHome" component={AdminHome} options={setStackOptions("Home")}/>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={setStackOptions("Attendance Application")}
        />
        {/* Change title of this later */}
        <Stack.Screen
          name="SCourse"
          component={StudentCourse}
          options={setStackOptions("Course")}
        />
        <Stack.Screen
          name="TCourse"
          component={TeacherCourse}
          options={setStackOptions("Course")}
        />
        <Stack.Screen
          name="ACourse"
          component={AdminCourse}
          options={setStackOptions("Course")}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={setStackOptions("Login")}
        />
        <Stack.Screen
          name="Register"
          component={RegistrationScreen}
          options={setStackOptions("Register")}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={setStackOptions("Settings")}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}