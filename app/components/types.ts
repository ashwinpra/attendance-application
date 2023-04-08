/// <reference path="../globals.d.ts" />

export type RootStackParamList = {
	Home: undefined;
	SHome: { rollno: string};
	THome: undefined;
	AHome: undefined;
	SCourse: {
		course: Course,
		isCurrentCourse: boolean
	};
	TCourse: {
		course: Course,
		isCurrentCourse: boolean
	};
	ACourse: { course: Course };
	Login: { userType: string };
	Register: undefined;
	Courses: undefined;
	Settings: undefined;
};
