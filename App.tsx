import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
<<<<<<< HEAD
import { ThemeProvider, Button, createTheme } from "@rneui/themed";
=======
>>>>>>> f82e161 (teacher home wip)
import HomeScreen from "./app/screens/HomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegistrationScreen from "./app/screens/RegistrationScreen";
import StudentHome from "./app/screens/StudentHome";
import TeacherHome from "./app/screens/TeacherHome";
<<<<<<< HEAD
import Courses from "./app/screens/Courses";
import Settings from "./app/screens/Settings";
=======
import AdminHome from "./app/screens/AdminHome";
>>>>>>> f82e161 (teacher home wip)

type RootStackParamList = {
  Home: undefined; // undefined means that the screen doesn't take any params
  SHome: undefined; // undefined means that the screen
<<<<<<< HEAD
  THome: undefined;
=======
  THome: undefined; // undefined means that the screen
  AHome: undefined; // undefined means that the screen
>>>>>>> f82e161 (teacher home wip)
  Login: undefined;
  Register: undefined;
  Courses: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackOptions = {
  // options to be passed to the  navigator
  headerStyle: {
    backgroundColor: "#FFD166",
  },
  headerTintColor: "#000",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  title: "Attendance Application",
  headerTitleAlign: "center",
};


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="THome">
<<<<<<< HEAD
        <Stack.Screen name="SHome" component={StudentHome} />
        <Stack.Screen name="THome" component={TeacherHome} />
=======
        <Stack.Screen name="SHome" component={StudentHome} 
        options={StackOptions}
        />
        <Stack.Screen name="THome" component={TeacherHome} 
        options={StackOptions}
        />
        <Stack.Screen name="AHome" component={AdminHome} 
        options={StackOptions}
        />
>>>>>>> f82e161 (teacher home wip)
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
