/// <reference path="../../globals.d.ts" />
import React, { useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ActionSheetIOS,
  Platform
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../components/types";

type Props = {
  navigation: NavigationProp<RootStackParamList, "AHome">;
};

type Course = {
  id: number;
  title: string;
  code: string;
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

  const renderCoursePicker = () => {
    if(Platform.OS === "ios") {
      return (
        <TouchableOpacity
          style={styles.picker}
          onPress={() => {
            ActionSheetIOS.showActionSheetWithOptions(
              {
                options: courses.map((course) => course.title),
                cancelButtonIndex: courses.length,
              },
              (buttonIndex) => {
                if (buttonIndex < courses.length) {
                  setSelectedCourse(courses[buttonIndex]);
                }
              }
            );
          }}
        >
          <Text style={styles.pickerText}>
            {selectedCourse ? selectedCourse.title : "Select a course"}
          </Text>
        </TouchableOpacity>
      );
    }
    else {
      return (
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

      );
    }
  }

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
      <View style={styles.header}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>Welcome back, Admin!</Text>
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
        {renderCoursePicker()}
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
    //flex: 1,
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
    justifyContent: "center",
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
  pickerText: {
    fontSize: 24,
    alignSelf: "center",
    // align this text in the TouchableOpacity 
    
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
