import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import styles from "../styles";


const studentRegex = /^[0-9][0-9][A-Z][A-Z][0-9][0-9][0-9][0-9][0-9]$/;
const teacherRegex = /^T[0-9]{4}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const usersRef = collection(db, "users");


const RegistrationScreen = () => {
	const [isStudent, setIsStudent] = useState(true);
	const [userID, setUserID] = useState("");
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [userConfirmPassword, setUserConfirmPassword] = useState("");
	const handleUserID = (text: string) => {
		setUserID(text);
	};

	const handleUserName = (text: string) => {
		setUserName(text);
	};

	const handleUserEmail = (text: string) => {
		setUserEmail(text);
	};

	const handleVerification = async () => {
		if (emailRegex.test(userEmail)) {
			// Check if user with this email already exists
			const emailQuery = query(usersRef, where("email", "==", userEmail));
			const emailQuerySnapshot = await getDocs(emailQuery);
			if (!emailQuerySnapshot.empty) {
				// User with this email already exists
				throw new Error("A user with this email already exists");
			}
			if (userPassword !== userConfirmPassword) {
				alert("Passwords do not match!");
				return;
			}
			if (isStudent) {
				if (studentRegex.test(userID)) {
					const userCredential = await createUserWithEmailAndPassword(
						auth,
						userEmail,
						userPassword
					);
					try {
						const docRef = await addDoc(collection(db, "users"), {
							name: userName,
							email: userEmail,
							userID: userID,
							type: "student",
						});
					} catch (e) {
						console.error("Error adding document: ", e);
					}
					alert("New student registered!");
					setUserID("");
					setUserName("");
					setUserEmail("");
					setUserPassword("");
					setUserConfirmPassword("");
				} else {
					alert("Invalid Roll no. format for student!");
				}
			} else {
				if (teacherRegex.test(userID)) {
					// search for teacher with this ID in collection "teachers"
					const teacherQuery = query(usersRef, where("userID", "==", userID));
					const teacherQuerySnapshot = await getDocs(teacherQuery);
					if (teacherQuerySnapshot.empty) {
						// Teacher with this ID does not exist
						throw new Error("Teacher with this ID does not exist");
					}
					const userCredential = await createUserWithEmailAndPassword(
						auth,
						userEmail,
						userPassword
					);
					try {
						// Update the teacher's document with same ID
						const userDocRef = doc(db, 'users', teacherQuerySnapshot.docs[0].id);
						await updateDoc(userDocRef, {
							name: userName,
							email: userEmail,
							type: "teacher",
						});
						console.log("Document written with ID: ", userDocRef.id);
					} catch (e) {
						console.error("Error adding document: ", e);
					}
					alert("Registered as teacher!");
					setUserID("");
					setUserName("");
					setUserEmail("");
					setUserPassword("");
					setUserConfirmPassword("");
				} else {
					alert("Invalid Enrollment ID format for teacher!");
				}
			}
		} else {
			alert("Invalid E-mail ID!");
		}
	};

	const handleSwitchUserType = () => {
		setIsStudent(!isStudent);
		setUserID("");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.mainTitle}>
				{isStudent ? "Student" : "Teacher"} Registration
			</Text>
			<Text style={styles.title}>
				{isStudent ? "Roll no." : "Enrollment ID"}
			</Text>
			<TextInput
				style={styles.input}
				onChangeText={handleUserID}
				value={userID}
				placeholder={isStudent ? "eg. 19CS10001" : "eg. 123456789012"}
				keyboardType={isStudent ? "default" : "number-pad"}
			/>
			<Text style={styles.title}>Name</Text>
			<TextInput
				style={styles.input}
				onChangeText={handleUserName}
				value={userName}
				placeholder={"eg. John Doe"}
			/>
			<Text style={styles.title}>E-mail ID</Text>
			<TextInput
				style={styles.input}
				onChangeText={handleUserEmail}
				autoCapitalize="none"
				value={userEmail}
				placeholder={"eg. name@mail.com"}
			/>
			<Text style={styles.title}>Password</Text>
			<TextInput
				style={styles.input}
				placeholder="Password"
				onChangeText={(text) => setUserPassword(text)}
				value={userPassword}
				secureTextEntry={true}
			/>
			<TextInput
				style={styles.input}
				placeholder="Confirm Password"
				onChangeText={(text) => setUserConfirmPassword(text)}
				value={userConfirmPassword}
				secureTextEntry={true}
			/>
			<TouchableOpacity style={styles.regButton} onPress={handleVerification}>
				<Text>Register</Text>
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
