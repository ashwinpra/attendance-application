/// <reference path="../globals.d.ts" />

export type RootStackParamList = {
	Home: undefined;
	SHome: { rollno: string};
	THome: { enrollmentID: string};
	AHome: undefined;
	SCourse: {
		course: Course,
	};
	TCourse: {
		course: Course,
	};
	ACourse: { course: Course };
	Login: { userType: string };
	Register: undefined;
	Courses: undefined;
	Settings: undefined;
};
