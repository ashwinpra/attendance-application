interface Course {
    id: number;
    title: string;
    code: string;
    teacher: string;
    attendancePeriod: boolean;
  }
  
interface User {
    name: string;
    profileImage: string;
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

// const primaryColor = '#1e88e5';

