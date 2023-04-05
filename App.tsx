import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ThemeProvider, Button, createTheme } from "@rneui/themed";
import HomeScreen from "./app/screens/HomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegistrationScreen from "./app/screens/RegistrationScreen";
import StudentHome from "./app/screens/homepages/StudentHome";
import TeacherHome from "./app/screens/homepages/TeacherHome";
import AdminHome from "./app/screens/homepages/AdminHome";
import Courses from "./app/screens/Courses";
import Settings from "./app/screens/Settings";
import { RootStackParamList } from "./app/components/types";


const Stack = createNativeStackNavigator<RootStackParamList>();

const StackOptions = {
  // options to be passed to the  navigator
  headerStyle: {
    backgroundColor: "#008CBA",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 25,
  },
  headerTitle: "Attendance Application",
  headerTitleAlign: "center",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AHome">
        <Stack.Screen name="SHome" component={StudentHome} />
        <Stack.Screen name="THome" component={TeacherHome} />
        <Stack.Screen name="AHome" component={AdminHome} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={StackOptions}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen name="Courses" component={Courses} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
