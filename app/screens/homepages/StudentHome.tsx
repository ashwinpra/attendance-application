/// <reference path="../../globals.d.ts" />
import React, { useState, useEffect } from "react";
import { BackHandler } from "react-native";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	Alert,
} from "react-native";
import Dialog from 'react-native-dialog';
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../components/types";
import { RouteProp } from "@react-navigation/native";

import {
	collection,
	query,
	where,
	getDocs,
	updateDoc,
	doc,
	addDoc,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import * as Location from "expo-location";

type Props = {
	route: RouteProp<RootStackParamList, "SHome">;
	navigation: NavigationProp<RootStackParamList, "SHome">;
};

const studentRef = collection(db, "users");
const coursesRef = collection(db, "courses");

// function getCurrentCourse(courses: Course[]): Course | undefined {
//   const currentDate = new Date();
//   console.log(currentDate.getDay());
//   for (const course of courses) {
//     if (course.timing && course.timing.length > 0) {
//       for (const timing of course.timing) {
//         if (timing.day === currentDate.getDay()) {
//           const [startHours, startMinutes] = timing.startTime
//             .split(":")
//             .map(Number);
//           const [endHours, endMinutes] = timing.endTime.split(":").map(Number);
//           const startTime = new Date();
//           startTime.setHours(startHours);
//           startTime.setMinutes(startMinutes);
//           const endTime = new Date();
//           endTime.setHours(endHours);
//           endTime.setMinutes(endMinutes);
//           if (currentDate >= startTime && currentDate <= endTime) {
//             return course;
//           }
//         }
//       }
//     }
//   }
//   return undefined;
// }


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
				<Text style={styles.courseCardProfessor}>{course.teacher}</Text>
				<Text style={styles.courseCardCode}>{course.code}</Text>
			</View>
		</TouchableOpacity>
	);
};

const StudentHome: React.FC<Props> = ({ navigation, route }) => {
	const { rollno } = route.params;
	// const currentCourse = getCurrentCourse(courses);
	// const otherCourses = courses.filter((course) => course !== currentCourse);
	let studentData: Student = {
		name: "",
		rollno: "",
	};
	let coursesData: Course[] = [];
	const [student, setStudent] = useState<Student>(studentData);
	const [courses, setCourses] = useState<Course[]>(coursesData);
	const [dialogVisible, setDialogVisible] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [location, setLocation] = useState<Location.LocationObject | null>(null);

	const checkLocationPermission = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			Alert.alert(
				'Location permission denied',
				'To use this app, please go to your device settings and enable location permission for the app',
				[{ text: 'OK' }],
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
				const studentQuery = query(studentRef, where("userID", "==", rollno));
				const studentQuerySnapshot = getDocs(studentQuery);
				const studentDoc = (await studentQuerySnapshot).docs[0];
				await updateDoc(studentDoc.ref, { location: position })
				setLocation(position);
			}
		);
		return () => {
			locationSubscriber.remove();
		};
	};

	// fetch student courses
	const studentQuery = query(studentRef, where("userID", "==", rollno));
	const studentQuerySnapshot = getDocs(studentQuery);
	useEffect(() => {
		getLocation();
		(async function () {
			const studentDoc = (await studentQuerySnapshot).docs[0];
			let studentData: Student = {
				name: studentDoc.data().name,
				rollno: route.params.rollno,
			};
			setStudent(studentData);
			const coursesListByID = studentDoc.data().courses;
			if (coursesListByID == undefined) {
				return;
			}
			const courseQuery = query(coursesRef, where("courseCode", "in", coursesListByID));
			const courseQuerySnapshot = getDocs(courseQuery);
			let counter = 0;
			let coursesData: Course[] = [];
			for (const courseDoc of (await courseQuerySnapshot).docs) {
				coursesData.push({
					id: counter,
					title: courseDoc.data().courseName,
					code: courseDoc.data().courseCode,
					teacher: courseDoc.data().courseTeacher,
					enrollmentCode: courseDoc.data().enrollmentKey,
				});
				counter++;
			}
			setCourses(coursesData);
			console.log("coursesData", coursesData);
			return;
		}
		)();
	}, []);

	const handleSettingsPress = () => {
		navigation.navigate("Settings");
	};

	const handleCoursePress = (course: Course) => {
		navigation.navigate("SCourse", {
			rollno: rollno,
			course: course,
		});
	};

	const handleEnroll = async (enrollmentCode: string) => {
		// search for enrollment code
		// if found, add course to student's courses
		// else, show error
		const courseQuery = query(
			coursesRef,
			where("enrollmentKey", "==", enrollmentCode)
		);
		const courseQuerySnapshot = getDocs(courseQuery);

		if ((await courseQuerySnapshot).empty) {
			Alert.alert("Error", "Invalid enrollment code.");
			return;
		} else {
			const courseDoc = (await courseQuerySnapshot).docs[0];

			const studentQuery = query(studentRef, where("userID", "==", rollno));
			const studentQuerySnapshot = getDocs(studentQuery);
			const studentDoc = (await studentQuerySnapshot).docs[0];

			// add this course to the student's courses
			let userCourses = studentDoc.data().courses;
			if (userCourses == undefined) {
				await updateDoc(studentDoc.ref, { courses: [courseDoc.data().courseCode] });
			} else {
				await updateDoc(studentDoc.ref, {
					courses: [...userCourses, courseDoc.data().courseCode],
				});
			}

			if (userCourses.includes(courseDoc.id)) {
				Alert.alert("Error", "You are already enrolled in this course.");
				return;
			} else {
				userCourses.push(courseDoc.id);
			}

			await updateDoc(studentDoc.ref, { courses: userCourses });
			Alert.alert("Success", "Course enrolled successfully!");
		}
	};

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.userContainer}>
				<View style={styles.userInfoContainer}>
					<Text style={styles.userName}>Welcome back, {student.name}!</Text>
					<Text style={styles.userInfo}>{student.rollno}</Text>
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
						<TouchableOpacity
							style={styles.enrollButton}
							onPress={() => setDialogVisible(true)}
						>
							<Text style={styles.enrollText}>Enroll in a Course</Text>
						</TouchableOpacity>
						<Dialog.Container visible={dialogVisible}>
							<Dialog.Title>Enter your name:</Dialog.Title>
							<Dialog.Input value={inputValue} onChangeText={setInputValue} />
							<Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
							<Dialog.Button
								label="OK"
								onPress={() => {
									// Handle the input value here
									handleEnroll(inputValue);
									setDialogVisible(false);
								}}
							/>
						</Dialog.Container>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	userContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 20,
	},
	profileImage: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginRight: 10,
	},
	userInfoContainer: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
	},
	userName: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 5,
	},
	userInfo: {
		fontSize: 16,
		color: "#555555",
	},
	settingsButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	settingsIcon: {
		width: 30,
		height: 30,
	},
	coursesSection: {
		marginTop: 20,
	},

	currentCourse: {
		marginBottom: 20,
	},

	otherCourses: {
		marginBottom: 20,
	},

	sectionTitle: {
		fontSize: 24,
		fontWeight: "bold",
		alignSelf: "center",
		marginBottom: 20,
		marginLeft: 20,
	},

	currentCourseCard: {
		marginBottom: 15,
		width: "95%",
		height: 130,
		alignSelf: "center",
		borderRadius: 10,
		padding: 20,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
		elevation: 7,
	},

	courseCard: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
		backgroundColor: "#fff",
		borderRadius: 5,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		padding: 10,
		width: "95%",
		height: 90,
		alignSelf: "center",
	},

	courseCardContent: {
		paddingLeft: 15,
	},

	courseCardTitle: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 5,
	},

	courseCardProfessor: {
		fontSize: 15,
		color: "#666",
	},

	courseCardCode: {
		fontSize: 15,
		color: "#666",
	},

	noCourseText: {
		fontSize: 16,
		fontStyle: "italic",
		textAlign: "center",
	},
	enrollButton: {
		backgroundColor: "#1e88e5",
		borderRadius: 5,
		padding: 10,
		alignSelf: "center",
	},
	enrollText: {
		color: "#FFF",
		fontSize: 12,
	},
});

export default StudentHome;
