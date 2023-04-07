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
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const RegistrationScreen = () => {
  const [isStudent, setIsStudent] = useState(true);
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleUserID = (text: string) => {
    setUserID(text);
  };

  const handleUserName = (text: string) => {
    setUserName(text);
  };

  const handleUserEmail = (text: string) => {
    setUserEmail(text);
  };



  const handleVerification = () => {
    if(emailRegex.test(userEmail)){
      if (isStudent) {
        if (studentRegex.test(userID)) {
          alert("Verification message sent to student's inbox");
          //TODO: send to DB here ig?
          setUserID("");
          setUserName("");
          setUserEmail("");
        } else {
          alert("Invalid Roll no. format for student!");
        }
      } else {
        if (teacherRegex.test(userID)) {
          alert("Verification message sent to teacher's inbox");
           //TODO: send to DB here ig?
           setUserID("");
           setUserName("");
           setUserEmail("");
        } else {
          alert("Invalid Enrollment ID format for teacher!");
        }
      }
    }
    else {
      alert("Invalid E-mail ID!")
    }
  };

  const handleSwitchUserType = () => {
    setIsStudent(!isStudent);
    setUserID("");
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>
        {isStudent ? "Roll no." : "Enrollment ID"}
      </Text>
      <TextInput
        style={Styles.input}
        onChangeText={handleUserID}
        value={userID}
        placeholder={isStudent ? "eg. 19CS10001" : "eg. 123456789012"}
        keyboardType={isStudent ? "default" : "number-pad"}
      />
      {/* add fields for name and e-mail also */}
      <Text style={Styles.title}>Name</Text>
      <TextInput
        style={Styles.input}
        onChangeText={handleUserName}
        value={userName}
        placeholder={"eg. John Doe"}
      />
      <Text style={Styles.title}>E-mail ID</Text>
      <TextInput
        style={Styles.input}
        onChangeText={handleUserEmail}
        value={userEmail}
        placeholder={"eg. name@mail.com"}
      />
      <TouchableOpacity style={Styles.button} onPress={handleVerification}>
        <Text>Send verification message</Text>
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
