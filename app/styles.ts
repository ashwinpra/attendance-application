import { StyleSheet } from "react-native";

export default StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: "#f5f5f5",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 30,
		paddingTop: 100,
	},

	welcomeText: {
		color: "#212121",
		fontSize: 40,
		fontWeight: "bold",
		marginBottom: 30,
		textAlign: "center",
	},

	loginButton: {
		backgroundColor: "#1e88e5",
		width: "100%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#082e57",
		marginVertical: 10,
		shadowColor: "black",
		shadowOffset: {
			width: 1,
			height: 5,
		},
		shadowOpacity: 1,
		shadowRadius: 5,
		elevation: 10,
	},

	loginText: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "bold",
	},

	registerButton: {
		backgroundColor: "#1e88e5",
		width: "80%",
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 35,
		borderWidth: 1,
		borderColor: "#082e57",
		marginVertical: 25,
		shadowOffset: {
			width: 1,
			height: 5,
		},
		shadowOpacity: 1,
		shadowRadius: 5,
		elevation: 10,
	},
	registerText: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold",
	},

	separator: {
		height: 20,
	},

	footer: {
		color: "black",
		fontSize: 15,
		fontWeight: "bold",
		flex: 1,
		justifyContent: "flex-end",
		paddingBottom: 30,
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
	},
	loginTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	input: {
		width: "80%",
		height: 40,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		marginBottom: 20,
	},
	button: {
		backgroundColor: "#008CBA",
		alignItems: "center",
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	mainTitle: {
		fontSize: 30,
		fontWeight: "bold",
		marginBottom: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	regButton: {
		alignItems: "center",
		backgroundColor: "#DDDDDD",
		padding: 10,
		marginTop: 10,
	},
	passTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
	userContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
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
		fontWeight: "bold",
		alignSelf: "center",
		marginBottom: 20,
		marginLeft: 20,
	},

	currentCourseCard: {
		marginBottom: 15,
		width: "95%",
		height: 130,
		alignSelf: "center",
		borderRadius: 10,
		padding: 20,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
		elevation: 7,
	},

	courseCard: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
		backgroundColor: "#fff",
		borderRadius: 5,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		padding: 10,
		width: "95%",
		height: 90,
		alignSelf: "center",
	},

	courseCardContent: {
		paddingLeft: 15,
	},

	courseCardTitle: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 5,
	},

	courseCardProfessor: {
		fontSize: 15,
		color: "#666",
	},

	courseCardCode: {
		fontSize: 15,
		color: "#666",
	},

	noCourseText: {
		fontSize: 16,
		fontStyle: "italic",
		textAlign: "center",
	},
	enrollButton: {
		backgroundColor: "#1e88e5",
		borderRadius: 5,
		padding: 10,
		alignSelf: "center",
	},
	enrollText: {
		color: "#FFF",
		fontSize: 12,
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
	admButton: {
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
		height: 50,
		width: "90%",
		backgroundColor: "#fff",
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#ccc",
		marginBottom: 10,
		paddingHorizontal: 10,
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
	courseTeacher: {
		color: "gray",
		textAlign: "center",
		fontSize: 20,
	},
	teacherContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
	},
	admLabel: {
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
	attButton: {
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
	subtitleText: {
		fontSize: 20,
		alignSelf: "center",
	},
});

