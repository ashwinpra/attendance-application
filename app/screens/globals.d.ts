interface Course {
    id: number;
    title: string;
    code: string;
    teacher: string;
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
