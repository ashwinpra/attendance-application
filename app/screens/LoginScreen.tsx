import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../components/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from "../styles";


const userRef = collection(db, "users");

type Props = {
	route: RouteProp<RootStackParamList, "Login">;
	navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
};

const LoginScreen: React.FC<Props> = ({ navigation, route }) => {
	const [email, setemail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { userType } = route.params;

	const handleLogIn = async () => {
		if (userType === "student" || userType === "teacher") {
			try {
				const userQuery = await query(userRef, where("email", "==", email));
				const querySnapshot = await getDocs(userQuery);
				if (querySnapshot.empty) {
					Alert.alert("User does not exist!");
					return;
				}
				const userData = querySnapshot.docs[0].data();
				if (userData.type !== userType) {
					Alert.alert("User is not authorized!");
					return;
				}
				signInWithEmailAndPassword(auth, email, password)
					.then((userCredential) => {
						const user = userCredential.user;
						if (userType === "student") {
							navigation.navigate("SHome", { rollno: userData.userID });
						} else if (userType === "teacher") {
							navigation.navigate("THome", { enrollmentID: userData.userID });
						}
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						console.log(errorCode, errorMessage);
					});
			} catch (error: any) {
				Alert.alert(`Failed to login: ${error?.message}`);
			}
		} else if (userType === "admin") {
			const adminRef = collection(db, "admin");
			try {
				const adminQuery = await query(adminRef, where("email", "==", email));
				const querySnapshot = await getDocs(adminQuery);
				if (querySnapshot.empty) {
					Alert.alert("User does not exist!");
					return;
				}
				signInWithEmailAndPassword(auth, email, password)
					.then((userCredential) => {
						const user = userCredential.user;
						navigation.navigate("AHome");
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						console.log(errorCode, errorMessage);
					});
			} catch (error: any) {
				Alert.alert(`Failed to login: ${error?.message}`);
			}
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.loginTitle}>Login</Text>
			<TextInput
				style={styles.input}
				placeholder="E-mail"
				autoCapitalize="none"
				onChangeText={(text) => setemail(text)}
				value={email}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				onChangeText={(text) => setPassword(text)}
				value={password}
				secureTextEntry={true}
			/>
			<TouchableOpacity style={styles.button} onPress={handleLogIn}>
				<Text style={styles.buttonText}>LogIn</Text>
			</TouchableOpacity>
		</View>
	);
};

export default LoginScreen;
