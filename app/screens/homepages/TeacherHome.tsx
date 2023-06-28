/// <reference path="../../globals.d.ts" />
import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../components/types";
import { RouteProp } from "@react-navigation/native";
import { collection, query, where, getDocs, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import styles from "../../styles"
import * as Location from "expo-location";

type Props = {
	route: RouteProp<RootStackParamList, "THome">;
	navigation: NavigationProp<RootStackParamList, "THome">;
};

const teacherRef = collection(db, "users");

interface CourseCardProps {
	course: Course;
	isCurrentCourse: boolean;
	onPress: () => void;
}

const CourseCard = ({ course, isCurrentCourse, onPress }: CourseCardProps) => {
	const cardStyle = isCurrentCourse
		? styles.currentCourseCard
		: styles.courseCard;

	return (
		<TouchableOpacity style={cardStyle} onPress={onPress}>
			<View style={styles.courseCardContent}>
				<Text style={styles.courseCardTitle}>{course.title}</Text>
				<Text style={styles.courseCardCode}>{course.code}</Text>
			</View>
		</TouchableOpacity>
	);
};

const fetchInfo = async (id: string) => {
	const teacherQuery = query(teacherRef, where("userID", "==", id));
	const teacherQuerySnapshot = getDocs(teacherQuery);
	const teacherDoc = (await teacherQuerySnapshot).docs[0];
	let coursesData: Course[] = [];
	let teaname: string = "";
	if (teacherDoc.data().courses == undefined) {
		coursesData = [];
	} else {
		coursesData = teacherDoc.data().courses;
	}
	teaname = teacherDoc.data().name;
	return { coursesData, teaname };
};

const TeacherHome: React.FC<Props> = ({ navigation, route }) => {
	const { enrollmentID } = route.params;

	let teacherData: Teacher = {
		name: "",
		enrollmentID: "",
	};
	let coursesData: Course[] = [];
	const [courses, setCourses] = useState<Course[]>(coursesData);
	const [teacher, setTeacher] = useState<Teacher>(teacherData);
	const [location, setLocation] = useState<Location.LocationObject | null>(null);

	const checkLocationPermission = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			Alert.alert(
				"Location permission denied",
				"To use this app, please go to your device settings and enable location permission for the app",
				[{ text: "OK" }],
				{ cancelable: false }
			);
			return false;
		}
		return true;
	};

	const getLocation = async () => {
		const hasLocationPermission = await checkLocationPermission();
		if (!hasLocationPermission) {
			return;
		}
		const locationSubscriber = await Location.watchPositionAsync(
			{
				accuracy: Location.Accuracy.Highest,
				timeInterval: 5000, // adjust as needed
				distanceInterval: 100, // adjust as needed
			},
			async (position) => {
				// send this position to the database
				const teacherQuery = query(
					teacherRef,
					where("userID", "==", enrollmentID)
				);
				const teacherQuerySnapshot = getDocs(teacherQuery);
				const teacherDoc = (await teacherQuerySnapshot).docs[0];
				await updateDoc(teacherDoc.ref, { location: position });
				setLocation(position);
			}
		);
		return () => {
			locationSubscriber.remove();
		};
	};

	// fetch student courses
	const teacherQuery = query(teacherRef, where("userID", "==", enrollmentID));
	const teacherQuerySnapshot = getDocs(teacherQuery);
	useEffect(() => {
		getLocation();
		( async function () {
			const teacherDoc = (await teacherQuerySnapshot).docs[0];
			let teacherData: Teacher = {
				name: teacherDoc.data().name,
				enrollmentID: teacherDoc.data().userID,
			};
			setTeacher(teacherData);

			const coursesRef = collection(db, "courses");

			// go through all the courses, and append those ones in which courseTeacher is the current teacher
			const courseQuery = query(coursesRef);
			const courseQuerySnapshot = await getDocs(courseQuery);

			let counter=0;
			let coursesData: Course[] = [];
			for (const courseDoc of courseQuerySnapshot.docs) {
				if (courseDoc.data().courseTeacher == enrollmentID) {
					coursesData.push({
						id: counter,
						title: courseDoc.data().courseName,
						code: courseDoc.data().courseCode,
						teacher: courseDoc.data().courseTeacher,
						enrollmentCode: courseDoc.data().enrollmentKey,
					});
				}
			}
			setCourses(coursesData);
			return;
		}
		)();
	}, []);

	const handleSettingsPress = () => {
		navigation.navigate("Settings",{userType: "teacher"});
	};

	const handleCoursePress = (course: Course) => {
		navigation.navigate("TCourse", {
			course: course,
		});
	};

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.userContainer}>
				<View style={styles.userInfoContainer}>
					<Text style={styles.userName}>Welcome back, {teacher.name}!</Text>
					<Text style={styles.userInfo}>{teacher.enrollmentID}</Text>
				</View>
				<View style={styles.settingsButton}>
					<TouchableOpacity onPress={() => handleSettingsPress()}>
						<Image
							source={require("../../assets/setting.png")}
							style={styles.settingsIcon}
						/>
					</TouchableOpacity>
				</View>
			</View>

			{/* Courses */}
			<ScrollView>
				<View style={styles.coursesSection}>
					{/* Current course 
          <View style={styles.currentCourse}>
            <Text style={styles.sectionTitle}>Current Course</Text>
            {currentCourse ? (
              <CourseCard
                course={currentCourse}
                onPress={() => handleCoursePress(currentCourse, true)}
                isCurrentCourse={true}
              />
            ) : (
              <Text style={styles.noCourseText}>No current course</Text>
            )}
          </View> */}

					{/* Other courses */}
					<View style={styles.otherCourses}>
						<Text style={styles.sectionTitle}>Courses</Text>
						{courses.length > 0 ? (
							courses.map((course) => (
								<CourseCard
									course={course}
									onPress={() => handleCoursePress(course)}
									isCurrentCourse={false}
								/>
							))
						) : (
							<Text style={styles.noCourseText}>No courses available</Text>
						)}
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default TeacherHome;
