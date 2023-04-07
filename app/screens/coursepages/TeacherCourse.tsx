/// <reference path="../../globals.d.ts" />
import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useEffect } from 'react';
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../components/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SizedBox from '../../components/SizedBox';
import Geolocation from 'react-native-geolocation-service';

Geolocation.getCurrentPosition(
	position => {
	  const latitude = position.coords.latitude;
	  const longitude = position.coords.longitude;
	  console.log('Current location:', latitude, longitude);
	},
	error => {
	  console.log(error.code, error.message);
	},
	{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  );

type Props = {
    route: RouteProp<RootStackParamList, "TCourse">;
    navigation: NavigationProp<RootStackParamList, "TCourse">;
};

const TeacherCourse: React.FC<Props> = ({route,navigation}) => {
	const [attendanceCode, setAttendanceCode] = useState<string | null>(null);

	useEffect(() => {
		const getAttendanceCode = async () => {
		  const code = await AsyncStorage.getItem('attendanceCode');
		  if (code) {
			setAttendanceCode(code);
		  }
		};
		getAttendanceCode();
	  }, []);

	const handleTakeAttendance = () => {
		const code = Math.random().toString(36).substring(2, 8).toUpperCase();
		//TODO: send code to DB
  		setAttendanceCode(code);
  		AsyncStorage.setItem('attendanceCode', code);
	}

	const handleEndAttendance = () => {
		setAttendanceCode(null);
  		AsyncStorage.removeItem('attendanceCode');
	}



	const renderAttendanceButton = () => {
		if (!route.params.isCurrentCourse) {
			return <Text style={styles.attendancePeriodInactive}>Course not ongoing</Text>;
		}
	
		if (attendanceCode) {
			return (
				<View style={styles.attendanceContainer}>
					<Text style={styles.attendanceCode}>{attendanceCode}</Text>
					<SizedBox height={10} />
					<TouchableOpacity style={styles.otherButton} onPress={handleTakeAttendance}>
						<Text style={styles.otherText}>Regenerate Code</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.otherButton} onPress={handleEndAttendance}>
						<Text style={styles.otherText}>End Attendance</Text>
					</TouchableOpacity>
				</View>
			);
		}
	
		return (
			<View style={styles.attendanceContainer}>
			<TouchableOpacity style={styles.attendanceButton} onPress={handleTakeAttendance}>
				<Text style={styles.attendanceButtonText}>Take Attendance</Text>
			</TouchableOpacity>
			</View>
		);
	};
	

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.courseName}>{route.params.course.title}</Text>
        <Text style={styles.courseCode}>{route.params.course.code}</Text>
      </View>
      {renderAttendanceButton()}
      <View style={styles.attendanceRecord}>
        <Text style={styles.sectionTitle}>Attendance Record</Text>
        {/* Attendance record goes here */}
      </View>
    </View>
  );
};

export default TeacherCourse;

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
	attendanceContainer: {
		alignItems: 'center',
		paddingVertical: 50,
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
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		backgroundColor: '#f2f2f2',
		// paddingVertical: 10,
		// paddingHorizontal: 20,
		padding: 10,
		borderRadius: 5,
		marginTop: 20,
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