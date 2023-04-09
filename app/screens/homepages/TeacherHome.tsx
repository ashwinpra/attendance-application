/// <reference path="../../globals.d.ts" />
import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	Alert,
} from "react-native";
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
	route: RouteProp<RootStackParamList, "THome">;
	navigation: NavigationProp<RootStackParamList, "THome">;
};

const teacherRef = collection(db, "users");

interface CourseCardProps {
	course: Course;
	isCurrentCourse: boolean;
	onPress: () => void;
}

//  function getCurrentCourse(courses: Course[]): Course | undefined {
//    const currentDate = new Date();
//    console.log(currentDate.getDay());
//    for (const course of courses) {
//      if (course.timing && course.timing.length > 0) {
//        for (const timing of course.timing) {
//          if (timing.day === currentDate.getDay()) {
//            const [startHours, startMinutes] = timing.startTime
//              .split(":")
//              .map(Number);
//            const [endHours, endMinutes] = timing.endTime.split(":").map(Number);
//            const startTime = new Date();
//            startTime.setHours(startHours);
//            startTime.setMinutes(startMinutes);
//            const endTime = new Date();
//            endTime.setHours(endHours);
//            endTime.setMinutes(endMinutes);
//            if (currentDate >= startTime && currentDate <= endTime) {
//              return course;
//            }
//          }
//        }
//      }
//    }
//    return undefined;
//  }

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

	//const currentCourse = getCurrentCourse(courses);
	//const otherCourses = courses.filter((course) => course !== currentCourse);

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
		navigation.navigate("Settings");
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
		marginBottom: 20,
		marginLeft: 20,
		alignSelf:'center'
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
		alignSelf: "center",
	},
});

export default TeacherHome;
