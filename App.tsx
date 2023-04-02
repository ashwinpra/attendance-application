import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ThemeProvider, Button, createTheme } from "@rneui/themed";
import HomeScreen from "./app/screens/HomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegistrationScreen from "./app/screens/RegistrationScreen";
import StudentHome from "./app/screens/StudentHome";
import TeacherHome from "./app/screens/TeacherHome";
import Courses from "./app/screens/Courses";
import Settings from "./app/screens/Settings";

type RootStackParamList = {
  Home: undefined; // undefined means that the screen doesn't take any params
  SHome: undefined; // undefined means that the screen
  THome: undefined;
  Login: undefined;
  Register: undefined;
  Courses: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="THome">
        <Stack.Screen name="SHome" component={StudentHome} />
        <Stack.Screen name="THome" component={TeacherHome} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Attendance Application",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen name="Courses" component={Courses} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
