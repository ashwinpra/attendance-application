/// <reference path="../../globals.d.ts" />
import React, { useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, TextInput, Image, ActionSheetIOS, Platform, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../components/types";
import SizedBox from "../../components/SizedBox";
import { collection, query, where, getDocs, updateDoc, addDoc, deleteDoc} from "firebase/firestore";
import { db } from "../../config/firebase";
import styles from "../../styles";
type Props = {
	navigation: NavigationProp<RootStackParamList, "AHome">;
};

type Course = {
	id: number;
	title: string;
	code: string;
};

type Student = {
	rollNo: string;
	name: string;
	email: string;
};

type Teacher = {
	id: string;
	name: string;
	email: string;
};


const AdminHomepage: React.FC<Props> = ({ navigation }) => {
	const [showModal, setShowModal] = useState(false);
	const [showModifyModal, setShowModifyModal] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
	const [courses, setCourses] = useState<Course[]>([
		{ id: 1, title: "React Native Course", code: "CS 100" },
		{ id: 2, title: "Web Development Course", code: "CS 200" },
		{ id: 3, title: "Data Science Course", code: "CS 300" },
	]);
	const [rollNo, setRollNo] = useState("");
	//add null option to student
	const [student, setStudent] = useState<Student | null>(null);
	const [teacherID, setTeacherID] = useState("");
	const [teacher, setTeacher] = useState<Teacher | null>(null);
	const [courseName, setCourseName] = useState("");
	const [courseCode, setCourseCode] = useState("");
	const [courseTeacher, setCourseTeacher] = useState("");
	const [modifyCourseName, setModifyCourseName] = useState("");
	const [modifyCourseCode, setModifyCourseCode] = useState("");

	const courseRef = collection(db, "courses");
	// fetch all courses in Course[]
	const fetchCourses = async () => {
		const courseQuery = query(courseRef);
		const courseSnapshot = await getDocs(courseQuery);
		const courseList: Course[] = [];
		let counter = 1;
		courseSnapshot.forEach((doc) => {
			courseList.push({
				id: counter++,
				title: doc.data().courseName,
				code: doc.data().courseCode,
			});
		});
		setCourses(courseList);
	};
	const handleSettingsPress = () => {
		navigation.navigate("Settings",{userType: "admin"});
	};

	const renderCoursePicker = () => {
		fetchCourses();
		if (courses.length === 0) {
			return (
				<View style={styles.picker}>
					<Text style={styles.pickerText}>No courses available</Text>
				</View>
			);
		}
		else {
			if (Platform.OS === "ios") {
				return (
					<TouchableOpacity
						style={styles.picker}
						onPress={() => {
							ActionSheetIOS.showActionSheetWithOptions(
								{
									options: courses.map((course) => course.title),
									cancelButtonIndex: courses.length,
								},
								(buttonIndex) => {
									if (buttonIndex < courses.length) {
										setSelectedCourse(courses[buttonIndex]);
									}
								}
							);
						}}
					>
						<Text style={styles.pickerText}>
							{selectedCourse ? selectedCourse.title : "Select a course"}
						</Text>
					</TouchableOpacity>
				);
			} else {
				return (
					<Picker
						style={styles.picker}
						selectedValue={selectedCourse?.id}
						onValueChange={handleCourseSelection}
					>
						<Picker.Item label="Select a course" value={null} />
						{courses.map((course) => (
							<Picker.Item
								key={course.id}
								label={`${course.title} (${course.code})`}
								value={course.id}
							/>
						))}
					</Picker>
				);
			}
		}

	};

	const handleCourseSelection = (itemValue: number) => {
		setSelectedCourse(
			courses.find((course) => course.id === itemValue) || null
		);
	};

	const handleAddCourse = async () => {
		// Add the new course to your list of courses
		const q = query(courseRef, where("courseCode", "==", courseCode));
		const querySnapshot = await getDocs(q);
		if (querySnapshot.size > 0) {
			console.log("Course already exists");
			return;
		}
		const docRef = await addDoc(courseRef, {
			courseName: courseName,
			courseCode: courseCode,
			courseTeacher: courseTeacher,
			enrollmentKey: courseCode,
		});
		// (e.g., by calling an API endpoint or updating state)
		// Close the modal
		setShowModal(false);
	};

	const handleModifyCourse = async () => {
		if (selectedCourse) {
			const q = query(courseRef, where("courseCode", "==", modifyCourseCode));
			const querySnapshot = await getDocs(q);
			if (querySnapshot.size > 0) {
				console.log("Course already exists");
				return;
			}
			const q2 = query(courseRef, where("courseCode", "==", selectedCourse.code));
			const querySnapshot2 = await getDocs(q2);

			const docRef = querySnapshot2.docs[0].ref
			await updateDoc(docRef, {
				courseName: modifyCourseName,
				courseCode: modifyCourseCode,
			});
			// (e.g., by calling an API endpoint or updating state)

			// Close the modal
			setShowModifyModal(false);
		}
	};

	const handleDeleteCourse = async () => {
		if (selectedCourse) {
			// Delete the course from your list of courses
			try {
				const q = query(
					courseRef,
					where("courseCode", "==", selectedCourse.code)
				);
				const querySnapshot = await getDocs(q);
				if (querySnapshot.size > 0) {
					querySnapshot.forEach(async (doc) => {
						await deleteDoc(doc.ref);
					});
				}
			} catch (e) {
				console.log(e);
			}
		}
	};

	const handleRollNoChange = (text: string) => {
		setRollNo(text);
	};

	const handleIDChange = (text: string) => {
		setTeacherID(text);
	};

	const handleSearchStudent = () => {
		// TODO: search for student in database using rollNo and set student state
		setStudent({
			rollNo: rollNo,
			name: "HO",
			email: "def@gmail.com",
		});
		setTeacher(null);
	};

	const handleSearchTeacher = () => {
		// TODO: search for teacher in database using ID and set teacher state
		setTeacher({
			id: teacherID,
			name: "John Doe",
			email: "john.doe@example.com",
		});
		setStudent(null);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.userInfoContainer}>
					<Text style={styles.userName}>Welcome back, Admin!</Text>
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
			<View style={styles.courseSelection}>
				<Text style={styles.label}>Select a course:</Text>
				{renderCoursePicker()}
			</View>
			<View style={styles.buttonsContainer}>
				<TouchableOpacity
					style={styles.admButton}
					onPress={() => setShowModal(true)}
				>
					<Text style={styles.buttonText}>Add course</Text>
				</TouchableOpacity>
				<Modal visible={showModal} animationType="slide">
					<SafeAreaView style={styles.modalContainer}>
						<Text style={styles.modalTitle}>Add Course</Text>
						<SizedBox height={10} />
						<TextInput
							style={styles.modalText}
							placeholder="Course Name"
							onChangeText={(text) => setCourseName(text)}
						/>
						<TextInput
							style={styles.modalText}
							placeholder="Course Code"
							onChangeText={(text) => setCourseCode(text)}
						/>
						<TextInput
							style={styles.modalText}
							placeholder="Course Teacher"
							onChangeText={(text) => setCourseTeacher(text)}
						/>
						<TouchableOpacity style={styles.admButton} onPress={handleAddCourse}>
							<Text style={styles.buttonText}>Add</Text>
						</TouchableOpacity>
						<SizedBox height={10} />
						<TouchableOpacity
							style={styles.admButton}
							onPress={() => setShowModal(false)}
						>
							<Text style={styles.buttonText}
								onPress={() => setShowModal(false)}>Cancel</Text>
						</TouchableOpacity>
					</SafeAreaView>
				</Modal>
				<TouchableOpacity
					style={[
						styles.button,
						//styles.secondaryButton,
						!selectedCourse && styles.disabledButton,
					]}
					onPress={() => setShowModifyModal(true)}
					disabled={!selectedCourse}
				>
					<Text style={styles.buttonText}>Modify course</Text>
				</TouchableOpacity>
				<Modal visible={showModifyModal} animationType="slide">
					<SafeAreaView style={styles.modalContainer}>
						<Text style={styles.modalTitle}>Modify Course</Text>
						<SizedBox height={10} />
						<Text>
							Current course: {/*{CurrentCourseName} + {CurrentCourseCode*/}{" "}
						</Text>
						<SizedBox height={10} />
						<TextInput
							style={styles.modalText}
							placeholder="New Course Name"
							onChangeText={(text) => setModifyCourseName(text)}
						/>
						<TextInput
							style={styles.modalText}
							placeholder="New Course Code"
							onChangeText={(text) => setModifyCourseCode(text)}
						/>
						<TouchableOpacity
							style={styles.admButton}
							onPress={handleModifyCourse}
						>
							<Text style={styles.buttonText}>Modify</Text>
						</TouchableOpacity>
						<SizedBox height={10} />
						<TouchableOpacity
							style={styles.admButton}
							onPress={() => setShowModifyModal(false)}
						>
							<Text style={styles.buttonText}
								onPress={() => setShowModifyModal(false)
								}>Cancel</Text>
						</TouchableOpacity>
					</SafeAreaView>
				</Modal>
				<TouchableOpacity
					style={[
						styles.button,
						//styles.secondaryButton,
						!selectedCourse && styles.disabledButton,
					]}
					onPress={handleDeleteCourse}
					disabled={!selectedCourse}
				>
					<Text style={styles.buttonText}>Delete course</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.searchContainer}>
				<Text style={styles.label}>Enter Roll No. / ID:</Text>
				{student ? (
					<TextInput
						style={styles.textInput}
						value={rollNo}
						onChangeText={handleRollNoChange}
					/>
				) : teacher ? (
					<TextInput
						style={styles.textInput}
						value={teacherID}
						onChangeText={handleIDChange}
					/>
				) : (
					<TextInput style={styles.textInput} />
				)}
				<View style={styles.buttonsContainer}>
					<TouchableOpacity style={styles.admButton} onPress={handleSearchStudent}>
						<Text style={styles.buttonText}>Search student</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.admButton} onPress={handleSearchTeacher}>
						<Text style={styles.buttonText}>Search teacher</Text>
					</TouchableOpacity>
				</View>
			</View>
			{student ? (
				<View style={styles.Profile}>
					<Text style={styles.label}>Student Profile</Text>
					<Text style={styles.Info}>Roll No: {student.rollNo}</Text>
					<Text style={styles.Info}>Name: {student.name}</Text>
					<Text style={styles.Info}>Email: {student.email}</Text>
				</View>
			) : teacher ? (
				<View style={styles.Profile}>
					<Text style={styles.label}>Teacher Profile</Text>
					<Text style={styles.Info}>ID: {teacher.id}</Text>
					<Text style={styles.Info}>Name: {teacher.name}</Text>
					<Text style={styles.Info}>Email: {teacher.email}</Text>
				</View>
			) : null}
		</View>
	);
};

export default AdminHomepage;
