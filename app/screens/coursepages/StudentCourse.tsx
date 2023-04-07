/// <reference path="../../globals.d.ts" />
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../components/types";
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


type Props = {
	route: RouteProp<RootStackParamList, "SCourse">;
	navigation: NavigationProp<RootStackParamList, "SCourse">;
};

const StudentCourse: React.FC<Props> = ({ route, navigation }) => {
	const [enteredCode, setEnteredCode] = useState('');
	const [attendanceMarked, setAttendanceMarked] = useState(false);


	const attendanceCode = "123abc" // TODO: get code from DB

	useEffect(() => {
		const getAttendanceMarked = async () => {
		  const attendanceMarked = await AsyncStorage.getItem('attendanceMarked');
		  if (attendanceMarked) {
			setAttendanceMarked(true);
		  }
		};
		getAttendanceMarked();
	  }, []);

	const handleSubmitCode = async () => {
		if (enteredCode === attendanceCode) {
			// TODO: update attendance in DB

		  	Alert.alert('Attendance granted', 'You have been marked present');
			await AsyncStorage.setItem('attendanceMarked', 'true');
			setAttendanceMarked(true)
		} else {
		  // Code is incorrect, show error
		  Alert.alert('Incorrect code', 'Please try again');
		}
	  }

	const renderAttendanceButton = () => {
		if (!route.params.isCurrentCourse) {
		  return <Text style={styles.attendancePeriodInactive}>Course not ongoing</Text>;
		}

		if (attendanceMarked) {
			return (
			  <Text style={styles.attendancePeriodInactive}>Attendance marked successfully</Text>
			);
		  }
	  
		if (attendanceCode) {
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
				4
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
    },
    attendancePeriodInactive: {
      fontSize: 16,
      color: '#666',
      alignSelf: 'center',
    },
    attendanceCode: {
		fontSize: 20,
		fontWeight: 'bold',
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
      paddingTop: 50,
	  paddingBottom: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      alignSelf: 'center'
    },
  });