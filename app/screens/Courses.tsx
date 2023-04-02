import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Course = {
  id: string;
  name: string;
  instructor: string;
};

const coursesData: Course[] = [
  {
    id: '1',
    name: 'Introduction to Computer Science',
    instructor: 'John Smith',
  },
  {
    id: '2',
    name: 'Data Structures and Algorithms',
    instructor: 'Jane Doe',
  },
];

const Courses: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Courses</Text>
      {coursesData.map((course) => (
        <View key={course.id} style={styles.courseContainer}>
          <Text style={styles.courseName}>{course.name}</Text>
          <Text style={styles.courseInstructor}>{course.instructor}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  courseContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#888',
  },
});

export default Courses;
