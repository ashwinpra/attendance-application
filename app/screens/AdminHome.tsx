import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

interface Course {
  id: number;
  title: string;
  code: string;
}

interface Teacher {
  name: string;
  enrollmentID: string;
  profileImage: string;
}

const coursesData: Course[] = [
  {
    id: 1,
    title: 'React Native Course',
    code: 'CS 100',
  },
  {
    id: 2,
    title: 'Web Development Course',
    code: 'CS 200',
  },
  {
    id: 3,
    title: 'Data Science Course',
    code: 'CS 300',
  },
];

const teacherData: Teacher = {
  name: 'John Doe',
  enrollmentID: '123456789',
  profileImage: './profile-picture.jpg',
};

interface CourseCardProps {
  course: Course;
  isCurrentCourse: boolean;
  onPress: () => void;
}

const CourseCard = ({ course, isCurrentCourse, onPress }: CourseCardProps) => {

  const cardStyle = isCurrentCourse ? styles.currentCourseCard : styles.courseCard;

  return (
    <TouchableOpacity style={cardStyle} onPress={onPress}>
      <View style={styles.courseCardContent}>
        <Text style={styles.courseCardTitle}>{course.title}</Text>
        <Text style={styles.courseCardCode}>{course.code}</Text>
      </View>
    </TouchableOpacity>
  );
};


const StudentHomePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [teacher, setTeacher] = useState<Teacher>(teacherData);

  const currentCourseId = 1; // change this to get the current course id

  const currentCourse = courses.filter((course) => course.id === currentCourseId)[0];
  const otherCourses = courses.filter((course) => course.id !== currentCourseId);

  const handleSettingsPress = () => {
    // Code to handle settings logic
  };

  const handleCoursePress = (course: Course, isCurrentCourse: boolean) => {
    // Code to handle course press logic
  };

  return (

    <View style={styles.container}>
    {/* Header */}
    <View style={styles.userContainer}>
    {teacher.profileImage ? (
        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
      ) : (
        <Image source={require('../assets/default-user.png')} style={styles.profileImage} />
      )}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>Welcome back, {teacher.name}!</Text>
        <Text style={styles.userInfo}>{teacher.enrollmentID}</Text>
      </View>
      <View style={styles.settingsButton}>
  <TouchableOpacity onPress={() => handleSettingsPress()}>
    <Image source={require("../assets/setting.png")} style={styles.settingsIcon} />
  </TouchableOpacity>
    </View>
  </View>

  {/* Courses */}
  <View style={styles.coursesSection}>
        {/* Current course */}
        <View style={styles.currentCourse}>
        <Text style={styles.sectionTitle}>Current Course</Text>
        {currentCourse ? (
            <CourseCard course={currentCourse} onPress={() => handleCoursePress(currentCourse,true)} isCurrentCourse={true} />
        ) : (
          <Text style={styles.noCourseText}>No current course</Text>
        )}
        </View>

        {/* Other courses */}
        <View style={styles.otherCourses}>
        <Text style={styles.sectionTitle}>Other Courses</Text>
        {otherCourses.length > 0 ? (
          otherCourses.map((course) => (
              <CourseCard course={course} onPress={() => handleCoursePress(course,false)} isCurrentCourse={false} />
          ))
        ) : (
          <Text style={styles.noCourseText}>No courses available</Text>
        )}
        </View>
    </View> 
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  userInfoContainer: {
    flex: 1,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userInfo: {
    fontSize: 16,
    color: '#555555',
  },
  settingsButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  settingsIcon: {
    width: 30,
    height: 30,
  },
  coursesSection: {
    marginTop: 20,
  },

  currentCourse: {
    marginBottom: 20,
  },

  otherCourses: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 20,
  },

  currentCourseCard: {
    marginBottom: 15,
    width: '95%',
    height: 130,
    alignSelf: 'center',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 10,
    width: '95%',
    height: 90,
    alignSelf: 'center',
  },

  courseCardContent: {
    paddingLeft: 15,
  },

  courseCardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  courseCardProfessor: {
    fontSize: 15,
    color: '#666',
  },

  courseCardCode: {
    fontSize: 15,
    color: '#666',
  },


  noCourseText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default StudentHomePage;