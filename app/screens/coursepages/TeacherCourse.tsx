/// <reference path="../../globals.d.ts" />
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../components/types";

type Props = {
    route: RouteProp<RootStackParamList, "TCourse">;
    navigation: NavigationProp<RootStackParamList, "TCourse">;
};
  
const TeacherCourse: React.FC<Props> = ({route,navigation}) => {

  const handleTakeAttendance = () => {
    // logic to take attendance
  }

  const renderAttendanceButton = () => {
    if (!route.params.isCurrentCourse) {
      return <Text style={styles.attendancePeriodInactive}>Course not ongoing</Text>;
    }

    return (
      <TouchableOpacity style={styles.attendanceButton} onPress={handleTakeAttendance}>
        <Text style={styles.attendanceButtonText}>Take Attendance</Text>
      </TouchableOpacity>
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
