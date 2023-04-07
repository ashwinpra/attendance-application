/// <reference path="../../globals.d.ts" />
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../components/types";

type Props = {
    navigation: NavigationProp<RootStackParamList, "AHome">;
};

//TODO: this will be fetched from the backend
const allCoursesData: Course[] = [
  {
    id: 1,
    title: 'React Native Course',
    code: 'CS 100',
    teacher: 'Prof 1',
  },
  {
    id: 2,
    title: 'Web Development Course',
    code: 'CS 200',
    teacher: 'Prof 2',
  },
  {
    id: 3,
    title: 'Data Science Course',
    code: 'CS 300',
    teacher: 'Prof 3',
  },
];

// this will be fetched from the backend
const adminData: Admin = {
  name: 'John Doe',
  adminID: '123',
  profileImage: './profile-picture.jpg',
};

interface CourseCardProps {
  course: Course;
  onPress: () => void;
}

const CourseCard = ({ course,  onPress }: CourseCardProps) => {

  const cardStyle = styles.courseCard;

  return (
    <TouchableOpacity style={cardStyle} onPress={onPress}>
      <View style={styles.courseCardContent}>
        <Text style={styles.courseCardTitle}>{course.title}</Text>
        <Text style={styles.courseCardProfessor}>{course.teacher}</Text>
        <Text style={styles.courseCardCode}>{course.code}</Text>
      </View>
    </TouchableOpacity>
  );
};


const AdminHome: React.FC<Props> = ({navigation}) => {
  const [courses, setCourses] = useState<Course[]>(allCoursesData);
  const [admin, setAdmin] = useState<Admin>(adminData);

  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  const handleCoursePress = (course: Course) => {
    navigation.navigate("ACourse", {course: course});
  };

  return (

    <View style={styles.container}>
    {/* Header */}
    <View style={styles.userContainer}>
    {admin.profileImage ? (
        <Image source={{ uri: admin.profileImage }} style={styles.profileImage} />
      ) : (
        <Image source={require('../../assets/default-user.png')} style={styles.profileImage} />
      )}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>Welcome back, {admin.name}!</Text>
        <Text style={styles.userInfo}>{admin.adminID}</Text>
      </View>
      <View style={styles.settingsButton}>
  <TouchableOpacity onPress={() => handleSettingsPress()}>
    <Image source={require("../../assets/setting.png")} style={styles.settingsIcon} />
  </TouchableOpacity>
    </View>
  </View>

  {/* Courses */}
  <View style={styles.coursesSection}>
        <View style={styles.otherCourses}>
        <Text style={styles.sectionTitle}>All Courses</Text>
        {allCoursesData.length > 0 ? (
          allCoursesData.map((course) => (
              <CourseCard course={course} onPress={() => handleCoursePress(course)}/>
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

export default AdminHome;
