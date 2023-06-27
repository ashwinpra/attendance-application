/// <reference path="../../app/globals.d.ts" />
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../components/types";
import { auth, db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const userRef = collection(db, "users");

type Props = {
	route: RouteProp<RootStackParamList, "Login">;
	navigation: NativeStackNavigationProp<RootStackParamList, "Settings">;
};

const Settings: React.FC<Props> = ({ navigation, route }) => {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const { userType } = route.params;

	const handleChangePassword = () => {
		// TODO: Implement password change functionality
		if (currentPassword === "1234") {
			// Change this to the correct password check logic
			setCurrentPassword("");
			setNewPassword("");
			Alert.alert(
				"Password Changed",
				"Your password has been successfully changed."
			);
		} else {
			Alert.alert(
				"Incorrect Password",
				"Please enter correct current password to change your password."
			);
		}
	};

	const handleLogout = () => {
		// TODO: Implement logout functionality
		navigation.reset({
			index: 0,
			routes: [{ name: "Home" }],
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Change Password</Text>
			<TextInput
				style={styles.input}
				value={currentPassword}
				onChangeText={setCurrentPassword}
				placeholder="Current Password"
				secureTextEntry={true}
			/>
			<TextInput
				style={styles.input}
				value={newPassword}
				onChangeText={setNewPassword}
				placeholder="New Password"
				secureTextEntry={true}
			/>
			<TouchableOpacity style={styles.button} onPress={handleChangePassword}>
				<Text style={styles.buttonText}>Change Password</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={handleLogout}>
				<Text style={styles.buttonText}>Log Out</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
	input: {
		width: "80%",
		height: 40,
		padding: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		marginBottom: 20,
	},
	button: {
		width: "80%",
		padding: 10,
		backgroundColor: "#3498db",
		alignItems: "center",
		marginBottom: 10,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});

export default Settings;
