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

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>
        {isStudent ? "Enter Roll no." : "Enter Enrollment ID"}
      </Text>
      <TextInput
        style={Styles.input}
        onChangeText={handleUserInput}
        value={userInput}
        placeholder={isStudent ? "eg. 19CS10001" : "eg. 123456789012"}
        keyboardType={isStudent ? "default" : "number-pad"}
      />
      <TouchableOpacity style={Styles.button} onPress={handleVerification}>
        <Text>Sent verification message</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={switchButtonStyles.button}
        onPress={handleSwitchUserType}
      >
        <Text style={switchButtonStyles.buttonText}>
          Switch to {isStudent ? "teacher" : "student"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
    textAlign: "center",
    borderColor: "#ccc",
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
    backgroundColor: "#008CBA",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
