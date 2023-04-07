/// <reference path="../../globals.d.ts" />
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../components/types";

type Props = {
	route: RouteProp<RootStackParamList, "TCourse">;
	navigation: NavigationProp<RootStackParamList, "TCourse">;
};

const AdminCourse: React.FC<Props> = ({ route, navigation }) => {

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.courseName}>{route.params.course.title}</Text>
				<Text style={styles.courseCode}>{route.params.course.code}</Text>
			</View>
		</View>
	);
};

//make styles sheet
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		backgroundColor: '#fff',
		padding: 20,
	},
	courseName: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	courseCode: {
		fontSize: 16,
		color: '#666',
	},
});

export default AdminCourse;
