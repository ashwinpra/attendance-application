import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../components/types";


interface Props {
  course: Course;
  students: Student[];
  teachers: Teacher[];
  onTeacherChange: (teacher: Teacher) => void;
  onStudentAdd: (student: Student) => void;
  onStudentRemove: (studentId: string) => void;
  route: RouteProp<RootStackParamList, "SCourse">;
	navigation: NavigationProp<RootStackParamList, "SCourse">;
}

const AdminCourse: React.FC<Props> = ({route,navigation}) => {
  const [selectedTeacher, setSelectedTeacher] = useState(route.params.course.teacher);

  const handleTeacherChange = (teacherId: string) => {
    const teacher = teachers.find((t) => t.enrollmentID === teacherId);
    if (teacher) {
      setSelectedTeacher(teacher);
      onTeacherChange(teacher);
    }
  };

  const [newStudentId, setNewStudentId] = useState('');

  const handleAddStudent = () => {
    const student = students.find((s) => s.id === newStudentId);
    if (student) {
      onStudentAdd(student);
      setNewStudentId('');
    }
  };

  const handleRemoveStudent = (studentId: string) => {
    onStudentRemove(studentId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.courseName}>{route.params.course.title}</Text>
      <Text style={styles.courseCode}>Course Code: {route.params.course.code}</Text>

      <View style={styles.teacherContainer}>
        <Text style={styles.label}>Teacher:</Text>
        <View style={styles.teacherSelect}>
          <TextInput
            style={styles.teacherInput}
            value={selectedTeacher.name}
            editable={false}
          />
          <Button
            title="Change"
            onPress={() => {
              // open teacher selection modal
            }}
          />
        </View>
      </View>

      <View style={styles.studentContainer}>
        <Text style={styles.label}>Students:</Text>
        <View style={styles.studentList}>
          {students.map((student) => (
            <View key={student.id} style={styles.studentItem}>
              <Text>{student.name}</Text>
              <Button
                title="Remove"
                onPress={() => handleRemoveStudent(student.id)}
              />
            </View>
          ))}
          <View style={styles.studentItem}>
            <TextInput
              style={styles.studentInput}
              value={newStudentId}
              onChangeText={(text) => setNewStudentId(text)}
            />
            <Button title="Add" onPress={handleAddStudent} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  courseName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  courseCode: {
    fontSize: 18,
    marginBottom: 16,
  },
  teacherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginRight: 16,
  },
  teacherSelect: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teacherInput: {
    flex: 1,
    fontSize: 18,
    marginRight: 8,
    padding: 8,
    borderWidth: 1
  },
  studentContainer: {
	flex: 1,
	flexDirection: 'column',
	justifyContent: 'space-between',
	  },
	  studentList: {	
	flex: 1,
	flexDirection: 'column',
	justifyContent: 'space-between',
	  },
	  studentItem: {
	flexDirection: 'row',
	justifyContent: 'space-between',
	  },
	  studentInput: {
	flex: 1,
	fontSize: 18,
	marginRight: 8,
	padding: 8,
	borderWidth: 1
	  },
});

export default AdminCourse;