/// <reference path="../../globals.d.ts" />
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../components/types";

type Props = {
    navigation: NavigationProp<RootStackParamList, "SCourse">;
};
  

type CourseProps = {
  course: Course;
  isCurrentCourse: boolean;
  attendancePeriod: boolean;
};

const CoursePage = ({ course, isCurrentCourse, attendancePeriod }: CourseProps) => {
    
  const renderAttendanceButton = () => {
    if (!isCurrentCourse || !attendancePeriod) {
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
        <Text style={styles.courseName}>{course.title}</Text>
        <Text style={styles.courseCode}>{course.code}</Text>
        <Text style={styles.courseTeacher}>Teacher: {course.teacher}</Text>
        {renderAttendanceButton()}
      </View>
      <View style={styles.attendanceRecord}>
        {/* Display attendance record here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    backgroundColor: '#6C5B7B',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  courseName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  courseCode: {
    color: '#FFF',
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  courseTeacher: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 5,
  },
  attendanceButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-end',
  },
  attendanceButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  attendancePeriodInactive: {
    fontSize: 16,
    color: '#666',
    alignSelf: 'flex-end',
  },
  attendanceRecord: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
  },
});

export default CoursePage;
