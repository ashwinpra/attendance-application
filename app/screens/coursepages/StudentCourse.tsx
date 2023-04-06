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
  
const StudentCourse: React.FC<Props> = ({route,navigation}) => {

  const renderAttendanceButton = () => {
    if (!route.params.isCurrentCourse || !route.params.attendancePeriod) {
      return <Text style={styles.attendancePeriodInactive}>Attendance period inactive</Text>;
    }

    return (
      <TouchableOpacity style={styles.attendanceButton}>
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
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  courseTeacher: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 20,
  },
  attendanceButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
  },
  attendanceButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  attendancePeriodInactive: {
    fontSize: 16,
    color: '#666',
    alignSelf: 'center',
  },
  
  attendanceRecord: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 50,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center'
  },
});

export default StudentCourse;
