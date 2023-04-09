/// <reference path="../../globals.d.ts" />
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../components/types";
import { useState, useEffect } from "react";
import SizedBox from "../../components/SizedBox";
import { db } from "../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  addDoc,
} from "firebase/firestore";
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart,
// } from "react-native-chart-kit";

const userRef = collection(db, "users");
const coursesRef = collection(db, "courses");

type Props = {
  route: RouteProp<RootStackParamList, "SCourse">;
  navigation: NavigationProp<RootStackParamList, "SCourse">;
};

const attendanceRef = collection(db, "attendance");

//TODO: get this from DB
let attendanceData: attendanceRecord[] = [
//   {
//     date: "2021-03-01",
//     status: true,
//   },
//   {
//     date: "2021-03-02",
//     status: true,
//   },
//   {
//     date: "2021-03-03",
//     status: true,
//   },
//   {
//     date: "2021-03-04",
//     status: false,
//   },
];

// get this from db for line chart
const line = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  datasets: [
    {
      data: [60, 65, 70, 66, 69],
      strokeWidth: 2, // optional
    },
  ],
};

const currentDate = new Date().toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

let courseTeacher = "";
const checkDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
	console.log(lat1, lon1, lat2, lon2)
	const earthRadius = 6371000; // meters
	const dLat = deg2rad(lat2 - lat1);
	const dLon = deg2rad(lon2 - lon1);
	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
			+ Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
			* Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	console.log(c)
	const distance = earthRadius * c;
	console.log(distance)
	return distance <= 100;
  }
  
  const deg2rad = (deg: number) => {
	return deg * (Math.PI/180)
  }

const StudentCourse: React.FC<Props> = ({ route, navigation }) => {
  const { rollno, course } = route.params;
  const [enteredCode, setEnteredCode] = useState("");
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [attendanceCode, setAttendanceCode] = useState<string>("");
  const [attendanceRecord, setAttendanceRecord] =
    useState<attendanceRecord[]>(attendanceData);
  const [attendanceDenied, setAttendanceDenied] = useState(false);
  const [showModal, setShowModal] = useState(false);


//   const stuName = useEffect(() => {
//     // get student name
//     async () => {
//       const studentQuery = query(userRef, where("userID", "==", rollno));
//       const studentQuerySnapshot = await getDocs(studentQuery);
//       const studentDoc = (await studentQuerySnapshot).docs[0];
//       return studentDoc.data().name;
//     };
//   });

  const handleReport = async () => {
	const attendanceQuery = query( attendanceRef, where("courseCode", "==", course.code), where("student", "==", rollno));
	const attendanceQuerySnapshot = await getDocs(attendanceQuery);
	console.log("docs:", attendanceQuerySnapshot.docs)
	for (const doc of attendanceQuerySnapshot.docs) {
		let status_bool;
		if (doc.data().status == "Present")
			status_bool = true;
		else
			status_bool = false;
		attendanceData.push({
			date: doc.data().date,
			status: status_bool
		})
	}
	console.log("attendanceData: ",attendanceData);
	setAttendanceRecord(attendanceData);
  }
  const getAttendanceCode = async () => {
    const courseQuery = query(
      coursesRef,
      where("courseCode", "==", course.code)
    );
    const courseQuerySnapshot = await getDocs(courseQuery);
    const courseDoc = (await courseQuerySnapshot).docs[0];

    return courseDoc.data().attendanceCode === undefined? "": courseDoc.data().attendanceCode;
  };

  const getStudentLocation = async () => {
    const studentQuery = query(userRef, where("userID", "==", rollno));
    const studentQuerySnapshot = await getDocs(studentQuery);
    const studentDoc = (await studentQuerySnapshot).docs[0];

    return studentDoc.data().location;
  };

  const getTeacherLocation = async () => {
    const courseQuery = query(
      coursesRef,
      where("courseCode", "==", course.code)
    );
    const courseQuerySnapshot = await getDocs(courseQuery);
    const courseDoc = (await courseQuerySnapshot).docs[0];

    courseTeacher = courseDoc.data().courseTeacher;

    const teacherQuery = query(userRef, where("userID", "==", courseTeacher));
    const teacherQuerySnapshot = await getDocs(teacherQuery);
    const teacherDoc = (await teacherQuerySnapshot).docs[0];

    return teacherDoc.data().location;
  };

  useEffect(() => {
    const getCode = async () => {
      const code = String(await getAttendanceCode());
      setAttendanceCode(code);
    };

    const getAttendanceMarked = async () => {
      //   const attendanceMarked = await AsyncStorage.getItem('attendanceMarked');
      // TODO: check if attendance is marked in DB by checking status
      if (attendanceMarked) {
        setAttendanceMarked(true);
      }
    };
    getCode();
    getAttendanceMarked();
	handleReport();
  }, []);

  const handleSubmitCode = async () => {
    const attendanceCode = await getAttendanceCode();
    if (enteredCode === attendanceCode) {
      const studentLocation = await getStudentLocation();
      const teacherLocation = await getTeacherLocation();

			console.log("studentLocation",studentLocation)
			console.log("teacherLocation", teacherLocation)

			const distance = checkDistance(studentLocation.coords.latitude, studentLocation.coords.longitude, teacherLocation.coords.latitude, teacherLocation.coords.longitude);
			// const distance = 0;
			if (!distance) {
				Alert.alert('Attendance not granted', 'You are not in the class');
				setAttendanceDenied(true);
				// Add Doc
				console.log("absent code");
				const docref = await addDoc(attendanceRef, {
					student: rollno,
					courseCode: course.code,
					date: currentDate,
					status: "Absent",
				});
				console.log("docref", docref.id);
				handleReport();
				return;
			}
			else{
				Alert.alert('Attendance granted', 'You have been marked present');
				setAttendanceMarked(true);
					await addDoc(attendanceRef, {
						student: rollno,
						courseCode: course.code,
						date: currentDate,
						status: "Present",
					});
					handleReport();
			}
		} else {
		  // Code is incorrect, show error
		  Alert.alert('Incorrect code', 'Please try again');
		}
	  }

	const renderAttendanceButton = () => {

		if(attendanceDenied){
			return (
				<Text style={styles.attendancePeriodInactive}>Attendance denied</Text>
			);
		}
	
		else if (attendanceMarked) {
			return (
			  <Text style={styles.attendancePeriodInactive}>Attendance marked successfully</Text>
			);
		  }
	  
		if (attendanceCode !== '') {
		  return (
			<View style={styles.attendanceContainer}>
			  <TextInput
				style={styles.attendanceCodeInput}
				placeholder="Enter attendance code"
				onChangeText={setEnteredCode}
			  />
			  <TouchableOpacity style={styles.otherButton} onPress={handleSubmitCode}>
				<Text style={styles.otherText}>Submit</Text>
			  </TouchableOpacity>
			</View>
		  );
		}
	  
		return <Text style={styles.attendancePeriodInactive}>Attendance period not active</Text>;
	  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.courseName}>{route.params.course.title}</Text>
        <Text style={styles.courseCode}>{route.params.course.code}</Text>
        <Text style={styles.courseTeacher}>
          Teacher: {route.params.course.teacher}
        </Text>
      </View>
      {renderAttendanceButton()}
      <View style={styles.attendanceRecord}>
        <Text style={styles.sectionTitle}>Attendance Record</Text>
        {/* Attendance record goes here */}
        {/* show total statistics */}
        <Text style={styles.courseCode}>
          Total Classes: {attendanceRecord.length}
        </Text>
        <Text style={styles.courseCode}>
          Total Classes Present:{" "}
          {attendanceRecord.filter((record) => record.status).length}
        </Text>
        <Text style={styles.courseCode}>
          Attendance Percentage:{" "}
          {(attendanceRecord.filter((record) => record.status).length /
            attendanceRecord.length) *
            100}
          %
        </Text>
        <SizedBox height={30}></SizedBox>
        {/* Option to view detailed record */}
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={styles.button}
        >
          <Text style={styles.attendanceButtonText}>View detailed record</Text>
        </TouchableOpacity>
        <Modal visible={showModal} animationType="slide">
          <SafeAreaView style={styles.modalContainer}>
            <SizedBox height={30}></SizedBox>
            {/* Basic attendance chart {need to use db} */}
            <FlatList
              data={attendanceRecord}
              renderItem={({ item }) => (
                <Text style={styles.modalTitle}>
                  {item.date} - {item.status ? "Present" : "Absent"}
                </Text>
              )}
              keyExtractor={(item) => item.date}
            />
            <SizedBox height={30}></SizedBox>
            {/* <LineChart
              data={line}
              width={Dimensions.get("window").width*0.9} // from react-native
              height={220}
              yAxisLabel={"%"}
              chartConfig={{
                backgroundColor: "#1b5fa8",
                backgroundGradientFrom: "#1b5fa8",
                backgroundGradientTo: "#519ced",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            /> */}
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.button}
            >
              <Text style={styles.attendanceButtonText}>Close</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
      </View>
    </View>
  );
};

export default StudentCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  courseName: {
    color: "black",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
  },
  courseCode: {
    color: "gray",
    textAlign: "center",
    fontSize: 24,
    marginBottom: 5,
  },
  courseTeacher: {
    color: "gray",
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "90%",
    alignSelf: "center",
  },
  otherButton: {
    backgroundColor: "#1e88e5",
    borderRadius: 5,
    padding: 10,
    alignSelf: "center",
    marginTop: 10,
  },
  otherText: {
    color: "#FFF",
    fontSize: 20,
  },
  attendanceContainer: {
    alignItems: "center",
    paddingVertical: 50,
  },
  attendanceButton: {
    backgroundColor: "#1e88e5",
    borderRadius: 5,
    padding: 20,
    alignSelf: "center",
  },
  attendanceButtonText: {
    color: "#FFF",
    fontSize: 24,
    alignSelf: "center",
  },
  attendancePeriodInactive: {
    fontSize: 16,
    color: "#666",
    alignSelf: "center",
  },
  attendanceCode: {
    fontSize: 20,
    fontWeight: "bold",
    width: "90%",
    textAlign: "center",
    backgroundColor: "#f2f2f2",
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  attendanceCodeInput: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  attendanceError: {
    fontSize: 16,
    color: "red",
    alignSelf: "center",
    marginTop: 10,
  },
  attendanceRecord: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingTop: 100,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  modalText: {
    fontSize: 20,
  },
});
