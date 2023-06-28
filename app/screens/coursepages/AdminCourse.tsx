import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../components/types";
import styles from "../../styles";

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

const AdminCourse: React.FC<Props> = ({ route, navigation }) => {
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
				<Text style={styles.admLabel}>Teacher:</Text>
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
				<Text style={styles.admLabel}>Students:</Text>
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

export default AdminCourse;