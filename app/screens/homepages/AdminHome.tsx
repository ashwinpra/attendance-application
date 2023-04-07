/// <reference path="../../globals.d.ts" />
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../components/types";

type Props = {
  navigation: NavigationProp<RootStackParamList, "AHome">;
};

<<<<<<< HEAD
//TODO: this will be fetched from the backend
const allCoursesData: Course[] = [
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
    ]
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
    ]
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
    ]
  },
];

// this will be fetched from the backend
const adminData: Admin = {
  name: 'John Doe',
  adminID: '123',
=======
type Course = {
  id: number;
  title: string;
  code: string;
>>>>>>> ashwin
};

type Student = {
  rollNo: string;
  name: string;
  email: string;
};

type Teacher = {
  id: string;
  name: string;
  email: string;
};

const teacherData: Teacher = {
  name: "John Doe",
  id: "123456789",
  email: "johndoe@example.com",
};

const studentData: Student = {
  name: "John Doe",
  rollNo: "21CS10088",
  email: "johndoe@example.com",
};

const AdminHomepage: React.FC<Props> = ({ navigation }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, title: "React Native Course", code: "CS 100" },
    { id: 2, title: "Web Development Course", code: "CS 200" },
    { id: 3, title: "Data Science Course", code: "CS 300" },
  ]);
  const [rollNo, setRollNo] = useState("");
  //add null option to student
  const [student, setStudent] = useState<Student | null>(studentData);
  const [teacherID, setTeacherID] = useState("");
  const [teacher, setTeacher] = useState<Teacher | null>(teacherData);

  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  const handleCourseSelection = (itemValue: number) => {
    setSelectedCourse(
      courses.find((course) => course.id === itemValue) || null
    );
  };

  const handleAddCourse = () => {
    console.log("Add course button pressed");
  };

  const handleModifyCourse = () => {
    if (selectedCourse) {
      console.log(
        `Modify course button pressed for course ${selectedCourse.title} (${selectedCourse.code})`
      );
    }
  };

  const handleDeleteCourse = () => {
    if (selectedCourse) {
      console.log(
        `Delete course button pressed for course ${selectedCourse.title} (${selectedCourse.code})`
      );
    }
  };

  const handleRollNoChange = (text: string) => {
    setRollNo(text);
  };

  const handleIDChange = (text: string) => {
    setTeacherID(text);
  };

  const handleSearchStudent = () => {
    console.log(`Search student button pressed for roll no ${rollNo}`);
    // TODO: search for student in database using rollNo and set student state
    setStudent({
      rollNo: rollNo,
      name: "John Doe",
      email: "john.doe@example.com",
    });
    setTeacher(null);
  };

  const handleSearchTeacher = () => {
    console.log(`Search teacher button pressed for ID ${teacherID}`);
    // TODO: search for teacher in database using ID and set teacher state
    setTeacher({
      id: teacherID,
      name: "John Doe",
      email: "john.doe@example.com",
    });
    setStudent(null);
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
    {/* Header */}
    <View style={styles.userContainer}>
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
=======
      <View style={styles.header}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>Welcome back, Admin!</Text>
>>>>>>> ashwin
        </View>
        <View style={styles.settingsButton}>
          <TouchableOpacity onPress={() => handleSettingsPress()}>
            <Image
              source={require("../../assets/setting.png")}
              style={styles.settingsIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Courses */}
      <View style={styles.courseSelection}>
        <Text style={styles.label}>Select a course:</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedCourse?.id}
          onValueChange={handleCourseSelection}
        >
          <Picker.Item label="Select a course" value={null} />
          {courses.map((course) => (
            <Picker.Item
              key={course.id}
              label={`${course.title} (${course.code})`}
              value={course.id}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddCourse}>
          <Text style={styles.buttonText}>Add course</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            //styles.secondaryButton,
            !selectedCourse && styles.disabledButton,
          ]}
          onPress={handleModifyCourse}
          disabled={!selectedCourse}
        >
          <Text style={styles.buttonText}>Modify course</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            //styles.secondaryButton,
            !selectedCourse && styles.disabledButton,
          ]}
          onPress={handleDeleteCourse}
          disabled={!selectedCourse}
        >
          <Text style={styles.buttonText}>Delete course</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Text style={styles.label}>Enter roll no/ID:</Text>
        {student ? (
          <TextInput
            style={styles.textInput}
            value={rollNo}
            onChangeText={handleRollNoChange}
          />
        ) : teacher ? (
          <TextInput
            style={styles.textInput}
            value={teacherID}
            onChangeText={handleIDChange}
          />
        ) : (
          <TextInput style={styles.textInput} />
        )}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSearchStudent}>
            <Text style={styles.buttonText}>Search student</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSearchTeacher}>
            <Text style={styles.buttonText}>Search teacher</Text>
          </TouchableOpacity>
        </View>
      </View>
      {student ? (
        <View style={styles.Profile}>
          <Text style={styles.label}>Student Profile</Text>
          <Text style={styles.Info}>Roll No: {student.rollNo}</Text>
          <Text style={styles.Info}>Name: {student.name}</Text>
          <Text style={styles.Info}>Email: {student.email}</Text>
        </View>
      ) : teacher ? (
        <View style={styles.Profile}>
          <Text style={styles.label}>Teacher Profile</Text>
          <Text style={styles.Info}>ID: {teacher.id}</Text>
          <Text style={styles.Info}>Name: {teacher.name}</Text>
          <Text style={styles.Info}>Email: {teacher.email}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  courseSelection: {
    marginBottom: 20,
  },
  userInfoContainer: {
<<<<<<< HEAD
    flex: 1,
    marginLeft: 10,
=======
    //flex: 1,
>>>>>>> ashwin
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userInfo: {
    fontSize: 16,
    color: "#555555",
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
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "30%",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  searchContainer: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  textInput: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  Profile: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  Info: {
    fontSize: 16,
    marginBottom: 5,
  },
});
export default AdminHomepage;
