/// <reference path="../../globals.d.ts" />
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../components/types";

type Props = {
	route: RouteProp<RootStackParamList, "SCourse">;
	navigation: NavigationProp<RootStackParamList, "SCourse">;
};

const StudentCourse: React.FC<Props> = ({ route, navigation }) => {

	const handleGiveAttendance = () => {
		// logic to give attendance
	}

	const renderAttendanceButton = () => {
		if (!route.params.isCurrentCourse) {
			return <Text style={styles.attendancePeriodInactive}>Course not ongoing</Text>;
		}
		else if (route.params.isCurrentCourse && !route.params.attendancePeriod) {
			return <Text style={styles.attendancePeriodInactive}>Attendance period inactive</Text>;
		}
		return (
			<TouchableOpacity style={styles.attendanceButton} onPress={handleGiveAttendance}>
				<Text style={styles.attendanceButtonText}>Give Attendance</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.courseName}>{route.params.course.title}</Text>
				<Text style={styles.courseCode}>{route.params.course.code}</Text>
				<Text style={styles.courseTeacher}>Teacher: {route.params.course.teacher}</Text>
			</View>
			{renderAttendanceButton()}
			<View style={styles.attendanceRecord}>
				<Text style={styles.sectionTitle}>Attendance Record</Text>
				{/* Attendance record goes here */}
			</View>
		</View>
	);
};


export default StudentCourse;
