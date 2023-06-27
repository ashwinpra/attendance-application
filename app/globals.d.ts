interface Course {
	id: number;
	title: string;
	code: string;
	teacher: string;
	// timing: {
	//     day: number;
	//     startTime: string;
	//     endTime: string;
	//   }[];
	enrollmentCode: string
}

// sunday - 0 , monday - 1 and so on

interface User {
	name: string;
}

interface Student extends User {
	rollno: string;
}

interface Teacher extends User {
	enrollmentID: string;
}

interface Admin extends User {
	adminID: string;
}

interface attendanceRecord {
	date: string;
	status: boolean;
}

// const primaryColor = '#1e88e5';

const styles = StyleSheet.create({
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
});

