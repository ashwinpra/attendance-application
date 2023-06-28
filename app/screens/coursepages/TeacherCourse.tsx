/// <reference path="../../globals.d.ts" />
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { useEffect } from "react";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../components/types";
import SizedBox from "../../components/SizedBox";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import styles from "../../styles";
import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart,
} from "react-native-chart-kit";

const courseRef = collection(db, "courses");

type Props = {
	route: RouteProp<RootStackParamList, "TCourse">;
	navigation: NavigationProp<RootStackParamList, "TCourse">;
};

const attendanceRecord = {};

// get this from db for line chart
const line = {
	labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
	datasets: [
		{
			data: [60, 65, 70, 66, 69],
			strokeWidth: 2, // optional
		},
	],
};

const TeacherCourse: React.FC<Props> = ({ route, navigation }) => {
	const { course } = route.params;
	const [attendanceCode, setAttendanceCode] = useState<string | null>(null);
	const [recordType, setRecordType] = useState("day-wise");

	const fetchCourseInfo = async (id: string) => {
		const courseQuery = query(courseRef, where("courseCode", "==", id));
		const courseQuerySnapshot = getDocs(courseQuery);
		const courseDoc = (await courseQuerySnapshot).docs[0];
		return courseDoc;
	};

	useEffect(() => {
		const getAttendanceCode = async () => {
			const courseDoc = await fetchCourseInfo(course.code);
			let code = courseDoc.data().attendanceCode;
			// const code = await AsyncStorage.getItem('attendanceCode');
			if (code) {
				setAttendanceCode(code);
			}
		};
		getAttendanceCode();
	}, []);

	const handleTakeAttendance = async () => {
		const code = Math.random().toString(36).substring(2, 8).toUpperCase();
		//TODO: send code to DB
		const courseDoc = await fetchCourseInfo(course.code);
		await updateDoc(courseDoc.ref, { attendanceCode: code });
		setAttendanceCode(code);
		// AsyncStorage.setItem('attendanceCode', code);
	};

	const handleEndAttendance = async () => {
		const courseDoc = await fetchCourseInfo(course.code);
		await updateDoc(courseDoc.ref, { attendanceCode: null });
		setAttendanceCode(null);
		// AsyncStorage.removeItem('attendanceCode');
	};

	const DayWiseRecord = ({ attendanceRecord }: any) => {
		// TODO: get attendance record from DB
		return (
			<View>
				<LineChart
					data={line}
					width={Dimensions.get("window").width * 0.9} // from react-native
					height={220}
					yAxisLabel={"%"}
					chartConfig={{
						backgroundColor: "#1b5fa8",
						backgroundGradientFrom: "#1b5fa8",
						backgroundGradientTo: "#519ced",
						decimalPlaces: 2, // optional, defaults to 2dp
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 16,
						},
					}}
					bezier
					style={{
						marginVertical: 8,
						borderRadius: 16,
					}}
				/>
			</View>
		);
	};

	const StudentWiseRecord = ({ attendanceRecord }: any) => {
		//TODO: get students' attendance record from DB
		const students: Student[] = [];
		return (
			<View>
				<LineChart
					data={line}
					width={Dimensions.get("window").width} // from react-native
					height={220}
					yAxisLabel={"%"}
					chartConfig={{
						backgroundColor: "#1b5fa8",
						backgroundGradientFrom: "#1b5fa8",
						backgroundGradientTo: "#519ced",
						decimalPlaces: 2, // optional, defaults to 2dp
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 16,
						},
					}}
					bezier
					style={{
						marginVertical: 8,
						borderRadius: 16,
					}}
				/>
			</View>
		);
	};

	const handleToggle = () => {
		const newRecordType =
			recordType === "day-wise" ? "student-wise" : "day-wise";
		setRecordType(newRecordType);
	};

	const renderAttendanceButton = () => {
		if (attendanceCode) {
			return (
				<View style={styles.attendanceContainer}>
					<Text style={styles.attendanceCode}>{attendanceCode}</Text>
					<SizedBox height={10} />
					<TouchableOpacity
						style={styles.otherButton}
						onPress={handleTakeAttendance}
					>
						<Text style={styles.otherText}>Regenerate Code</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.otherButton}
						onPress={handleEndAttendance}
					>
						<Text style={styles.otherText}>End Attendance</Text>
					</TouchableOpacity>
				</View>
			);
		}

		return (
			<View style={styles.attendanceContainer}>
				<TouchableOpacity
					style={styles.attendanceButton}
					onPress={handleTakeAttendance}
				>
					<Text style={styles.attendanceButtonText}>Take Attendance</Text>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.courseName}>{course.title}</Text>
				<Text style={styles.courseCode}>{course.code}</Text>
			</View>
			<ScrollView>
				{renderAttendanceButton()}
				<View style={styles.attendanceRecord}>
					<Text style={styles.sectionTitle}>Attendance Record</Text>
					{/* Attendance record goes here */}
					<View>
						<TouchableOpacity onPress={handleToggle} style={styles.otherButton}>
							<Text style={styles.otherText}>
								Show {recordType === "day-wise" ? "Student-wise" : "Day-wise"}{" "}
								record
							</Text>
						</TouchableOpacity>
						{recordType === "day-wise" ? (
							<DayWiseRecord attendanceRecord={attendanceRecord}></DayWiseRecord>
						) : (
							<StudentWiseRecord attendanceRecord={attendanceRecord}>
							</StudentWiseRecord>
						)}
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default TeacherCourse;
