/// <reference path="../globals.d.ts" />

export type RootStackParamList = {
	Home: undefined;
	SHome: undefined;
	THome: undefined;
	AHome: undefined;
	SCourse: {
		course: Course,
		isCurrentCourse: boolean
		attendancePeriod: boolean
	};
	TCourse: {
		course: Course,
		isCurrentCourse: boolean
	};
	ACourse: { course: Course };
	TakeAttendance: {
		course: Course

	};
	GiveAttendance: {
		course: Course

	};
	Login: undefined;
	Register: undefined;
	Courses: undefined;
	Settings: undefined;
};
