/// <reference path="../../globals.d.ts" />
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, FlatList, Modal, SafeAreaView} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../components/types";
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SizedBox from '../../components/SizedBox';
import { db } from "../../config/firebase";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";

const userRef = collection(db, "students");
const coursesRef = collection(db, "courses");

type Props = {
	route: RouteProp<RootStackParamList, "SCourse">;
	navigation: NavigationProp<RootStackParamList, "SCourse">;
};

//TODO: get this from DB
const attendanceData: attendanceRecord[] = [
	{
		date: "2021-03-01",
		status: true
	},
	{
		date: "2021-03-02",
		status: true
	},
	{
		date: "2021-03-03",
		status: true
	},
	{
		date: "2021-03-04",
		status: false
	},
];

const checkDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
	const earthRadius = 6371000; // meters
	const dLat = (lat2 - lat1)*(Math.PI/180);
	const dLon = (lon2 - lon1)*(Math.PI/180);
	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
			+ Math.cos((lat1)*(Math.PI/180)) * Math.cos((lat2)*(Math.PI/180))
			* Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = earthRadius * c;
	return distance <= 100;
  }

const StudentCourse: React.FC<Props> = ({ route, navigation }) => {
	const {rollno, course} = route.params;
	const [enteredCode, setEnteredCode] = useState('');
	const [attendanceMarked, setAttendanceMarked] = useState(false);
	const [attendanceCode, setAttendanceCode] = useState<string>('');
	const [attendanceRecord, setAttendanceRecord] = useState<attendanceRecord[]>(attendanceData);
	const [attendanceDenied, setAttendanceDenied] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const getAttendanceCode = async () => {
		const courseQuery = query(coursesRef, where("courseCode", "==", course.code));
		const courseQuerySnapshot = await getDocs(courseQuery);
		const courseDoc = (await courseQuerySnapshot).docs[0];

		return courseDoc.data().attendanceCode;
	}

	const getStudentLocation = async () => {
		const studentQuery = query(userRef, where("userID", "==", rollno));
		const studentQuerySnapshot = await getDocs(studentQuery);
		const studentDoc = (await studentQuerySnapshot).docs[0];

		return studentDoc.data().location;
	}

	const getTeacherLocation = async () => {
		const courseQuery = query(coursesRef, where("courseCode", "==", course.code));
		const courseQuerySnapshot = await getDocs(courseQuery);
		const courseDoc = (await courseQuerySnapshot).docs[0];

		const courseTeacher = courseDoc.data().courseTeacher;

		const teacherQuery = query(userRef, where("userID", "==", courseTeacher));
		const teacherQuerySnapshot = await getDocs(teacherQuery);
		const teacherDoc = (await teacherQuerySnapshot).docs[0];

		return teacherDoc.data().location;
	}

	useEffect(() => {
		const getAttendanceCode = async () => {
			const code = String(await getAttendanceCode());
			setAttendanceCode(code);
		}

		const getAttendanceMarked = async () => {
		//   const attendanceMarked = await AsyncStorage.getItem('attendanceMarked');
		// TODO: check if attendance is marked in DB by checking status
		  if (attendanceMarked) {
			setAttendanceMarked(true);
		  }
		};
		getAttendanceCode();
		getAttendanceMarked();
	  }, []);

	const handleSubmitCode = async () => {
		const attendanceCode = await getAttendanceCode();
		if (enteredCode === attendanceCode) {
			
			const studentLocation = await getStudentLocation();
			const teacherLocation = await getTeacherLocation();

			const distance = checkDistance(studentLocation.latitude, studentLocation.longitude, teacherLocation.latitude, teacherLocation.longitude);

			if (!distance) {
				Alert.alert('Attendance not granted', 'You are not in the class');
				setAttendanceDenied(true);
				return;
				// TODO: mark absent in DB
			}
			else{
				// TODO: update attendance in DB
				Alert.alert('Attendance granted', 'You have been marked present');
				// await AsyncStorage.setItem('attendanceMarked', 'true');
				setAttendanceMarked(true)
			}
		
		} else {
		  // Code is incorrect, show error
		  Alert.alert('Incorrect code', 'Please try again');
		}
	  }

	const renderAttendanceButton = () => {

		if(attendanceDenied){
			return (
				<Text style={styles.attendancePeriodInactive}>Attendance denied</Text>
			);
		}
	
		if (attendanceMarked) {
			return (
			  <Text style={styles.attendancePeriodInactive}>Attendance marked successfully</Text>
			);
		  }
	  
		if (attendanceCode != '') {
		  return (
			<View style={styles.attendanceContainer}>
			  <TextInput
				style={styles.attendanceCodeInput}
				placeholder="Enter attendance code"
				onChangeText={setEnteredCode}
			  />
			  <TouchableOpacity style={styles.otherButton} onPress={handleSubmitCode}>
				<Text style={styles.otherText}>Submit</Text>
			  </TouchableOpacity>
			</View>
		  );
		}
	  
		return <Text style={styles.attendancePeriodInactive}>Attendance period not active</Text>;
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
				{/* show total statistics */}
				<Text style={styles.courseCode}>Total Classes: {attendanceRecord.length}</Text>
				<Text style={styles.courseCode}>Total Classes Present: {attendanceRecord.filter(record => record.status).length}</Text>
				<Text style={styles.courseCode}>Attendance Percentage: {attendanceRecord.filter(record => record.status).length/attendanceRecord.length * 100}%</Text>
				<SizedBox height={30}></SizedBox>
				{/* Option to view detailed record */}
				<TouchableOpacity onPress={() => setShowModal(true)} style={styles.button}>
  					<Text style={styles.attendanceButtonText}>View detailed record</Text>
				</TouchableOpacity>
				<Modal visible={showModal} animationType='slide'>
				<SafeAreaView style={styles.modalContainer}>
				<SizedBox height={30}></SizedBox>
				<FlatList data={attendanceRecord} renderItem={({item}) => <Text style={styles.modalTitle}>{item.date} - {item.status ? "Present" : "Absent"}</Text>} keyExtractor={item => item.date} />
			<TouchableOpacity onPress={() => setShowModal(false)}style={styles.button}>
				<Text style={styles.attendanceButtonText}>Close</Text>
			</TouchableOpacity>
				</SafeAreaView>
			</Modal>
			</View>
		</View>
	);
};

export default StudentCourse;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    header: {
      borderRadius: 10,
      padding: 10,
      marginBottom: 20,
    },
    courseName: {
      color: 'black',
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    courseCode: {
      color: 'gray',
      textAlign: 'center',
      fontSize: 24,
      marginBottom: 5,
    },
    courseTeacher: {
      color: 'gray',
      textAlign: 'center',
      fontSize: 20,
    },
	button: {
		backgroundColor: "#007bff",
		padding: 10,
		borderRadius: 5,
		width: "90%",
		alignSelf: "center",
	  },
	otherButton: {
		backgroundColor: '#1e88e5',
		borderRadius: 5,
		padding: 10,
		alignSelf: 'center',
		marginTop: 10,
	},			
	otherText: {
		color: '#FFF',
		fontSize: 20,
	},
	attendanceContainer: {
		alignItems: 'center',
		paddingVertical: 50,
	  },
    attendanceButton: {
      backgroundColor: '#1e88e5',
      borderRadius: 5,
      padding: 20,
      alignSelf: 'center',
    },
    attendanceButtonText: {
      color: '#FFF',
      fontSize: 24,
	  alignSelf: 'center'
    },
    attendancePeriodInactive: {
      fontSize: 16,
      color: '#666',
      alignSelf: 'center',
    },
    attendanceCode: {
		fontSize: 20,
		fontWeight: 'bold',
		width: '90%',
		textAlign: 'center',
		backgroundColor: '#f2f2f2',
		// paddingVertical: 10,
		// paddingHorizontal: 20,
		padding: 10,
		borderRadius: 5,
		marginTop: 20,
	  },
	  attendanceCodeInput: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		backgroundColor: '#f2f2f2',
		padding: 10,
		borderRadius: 5,
		marginTop: 20,
	  },
	  attendanceError: {
		fontSize: 16,
		color: 'red',
		alignSelf: 'center',
		marginTop: 10,
	  },
    attendanceRecord: {
      backgroundColor: '#FFF',
      borderRadius: 10,
      paddingTop: 100,
	  paddingBottom: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      alignSelf: 'center'
    },
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		margin: 20,
	  },
	  modalTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
		alignSelf: "center",
	  },
	  modalText: {
		fontSize: 20,
	  },
  });