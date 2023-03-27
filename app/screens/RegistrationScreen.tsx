import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const studentRegex = /^[0-9][0-9][A-Z][A-Z][0-9][0-9][0-9][0-9][0-9]$/;
const teacherRegex = /^[0-9]{12}$/;

const RegistrationScreen = () => {
  const [isStudent, setIsStudent] = useState(true);
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (text: string) => {
    setUserInput(text);
  };

  const handleVerification = () => {
    if (isStudent) {
      if (studentRegex.test(userInput)) {
        alert("Verification message sent to student's inbox");
        setUserInput("");
      } else {
        alert("Invalid Roll no. format for student");
      }
    } else {
      if (teacherRegex.test(userInput)) {
        alert("Verification message sent to teacher's inbox");
        setUserInput("");
      } else {
        alert("Invalid Enrollment ID format for teacher");
      }
    }
  };

  const handleSwitchUserType = () => {
    setIsStudent(!isStudent);
    setUserInput("");
  };

  const studentStyles = StyleSheet.create({
    container: {
      alignItems: "center",
      marginTop: 50,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: "80%",
      textAlign: "center",
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
      marginTop: 10,
    },
  });

  const teacherStyles = StyleSheet.create({
    container: {
      alignItems: "center",
      marginTop: 50,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: "80%",
      textAlign: "center",
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
      marginTop: 10,
    },
  });

  const switchButtonStyles = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
      marginTop: 20,
    },
  });

  return (
    <View>
      <View
        style={isStudent ? studentStyles.container : teacherStyles.container}
      >
        <Text>{isStudent ? "Enter Roll no." : "Enter Enrollment ID"}</Text>
        <TextInput
          style={isStudent ? studentStyles.input : teacherStyles.input}
          onChangeText={handleUserInput}
          value={userInput}
          placeholder={isStudent ? "eg. 19CS10001" : "eg. 123456789012"}
          keyboardType={isStudent ? "default" : "number-pad"}
        />
        <TouchableOpacity
          style={isStudent ? studentStyles.button : teacherStyles.button}
          onPress={handleVerification}
        >
          <Text>Sent verification message</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={switchButtonStyles.button}
        onPress={handleSwitchUserType}
      >
        <Text>Switch to {isStudent ? "teacher" : "student"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationScreen;
