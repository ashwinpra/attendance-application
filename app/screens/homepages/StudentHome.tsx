/// <reference path="../../globals.d.ts" />
import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../components/types";


type Props = {
  navigation: NavigationProp<RootStackParamList, "SHome">;
};



//TODO: this will be fetched from the backend
const coursesData: Course[] = [
  {
    id: 1,
    title: 'React Native Course',
    code: 'CS 100',
    teacher: 'Prof 1',
    timing: [
      {
        day: 0,
        startTime: "14:00",
        endTime: "16:00"
      },
      {
        day: 2,
        startTime: "14:00",
        endTime: "16:00"
      }
    ],
    enrollmentCode: "RNC100"
  },
  {
    id: 2,
    title: 'Web Development Course',
    code: 'CS 200',
    teacher: 'Prof 2',
    timing: [
      {
        day: 1,
        startTime: "14:00",
        endTime: "16:00"
      },
      {
        day: 3,
        startTime: "14:00",
        endTime: "16:00"
      }
    ], 
    enrollmentCode: "WDC200"
  },
  {
    id: 3,
    title: 'Data Science Course',
    code: 'CS 300',
    teacher: 'Prof 3',
    timing: [
      {
        day: 6,
        startTime: "14:00",
        endTime: "16:00"
      },
      {
        day: 5,
        startTime: "14:00",
        endTime: "16:00"
      }
    ],
    enrollmentCode: "DSC300"
  },
  {
    id: 4,
    title: 'Machine Learning Course',
    code: 'CS 500',
    teacher: 'Prof 4',
    timing: [
      {
        day: 1,
        startTime: "17:00",
        endTime: "19:00"
      },
      {
        day: 3,
        startTime: "17:00",
        endTime: "19:00"
      }
    ],
    enrollmentCode: "MLC500"
  },
  {
    id: 5,
    title: 'Deep Learning Course',
    code: 'CS 600',
    teacher: 'Prof 4',
    timing: [
      {
        day: 1,
        startTime: "17:00",
        endTime: "19:00"
      },
      {
        day: 3,
        startTime: "17:00",
        endTime: "19:00"
      }
    ],
    enrollmentCode: "DLC600"
  },
];


function getCurrentCourse(courses: Course[]): Course | undefined {
  const currentDate = new Date();
  console.log(currentDate.getDay())
  for (const course of courses) {
    if (course.timing && course.timing.length > 0) {
      for (const timing of course.timing) {
        if (timing.day === currentDate.getDay()) {
          const [startHours, startMinutes] = timing.startTime.split(':').map(Number);
          const [endHours, endMinutes] = timing.endTime.split(':').map(Number);
          const startTime = new Date();
          startTime.setHours(startHours);
          startTime.setMinutes(startMinutes);
          const endTime = new Date();
          endTime.setHours(endHours);
          endTime.setMinutes(endMinutes);
          if (currentDate >= startTime && currentDate <= endTime) {
            return course;
          }
        }
      }
    }
  }
  return undefined
}

//TODO: this will be fetched from the backend
const studentData: Student = {
  name: 'John Doe',
  rollno: '21CS10001',
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
        <Text style={styles.courseCardProfessor}>{course.teacher}</Text>
        <Text style={styles.courseCardCode}>{course.code}</Text>
      </View>
    </TouchableOpacity>
  );
};


const StudentHome: React.FC<Props> = ({navigation}) => {
  
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [student, setStudent] = useState<Student>(studentData);

  const currentCourse = getCurrentCourse(courses)
  const otherCourses = courses.filter((course) => course !== currentCourse);

  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  const handleCoursePress = (course: Course, isCurrentCourse: boolean) => {
    navigation.navigate("SCourse", 
      {course: course,
      isCurrentCourse: isCurrentCourse, 
    });
  };

  const handleEnroll = async () => {
    const enrollmentCode = promptEnrollmentCode();
    if(!enrollmentCode) return;
    
  };

  const promptEnrollmentCode = async () => {
    return new Promise((resolve, reject) => {
      Alert.prompt(
        'Enter Enrollment Code',
        'Please enter the enrollment code for the course.',
        [
          {
            text: 'Cancel',
            onPress: () => resolve(null),
            style: 'cancel',
          },
          {
            text: 'Enroll',
            onPress: code => resolve(code),
          },
        ],
        'plain-text'
      );
    });
  };

  return (

    <View style={styles.container}>
    {/* Header */}
    <View style={styles.userContainer}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>Welcome back, {student.name}!</Text>
        <Text style={styles.userInfo}>{student.rollno}</Text>
      </View>
      <View style={styles.settingsButton}>
  <TouchableOpacity onPress={() => handleSettingsPress()}>
    <Image source={require("../../assets/setting.png")} style={styles.settingsIcon} />
  </TouchableOpacity>
    </View>
  </View>

  {/* Courses */}
  <ScrollView>
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
        <TouchableOpacity style={styles.enrollButton} onPress={handleEnroll}>
        <Text style={styles.enrollText}>Enroll in a Course</Text>
      </TouchableOpacity>
        </View>
        
        
    </View> 
        </ScrollView>
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
    marginLeft: 10,
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
    textAlign: 'center',
  },
  enrollButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
  },
  enrollText: {
    color: '#FFF',
    fontSize: 12,
  },
});

export default StudentHome;
