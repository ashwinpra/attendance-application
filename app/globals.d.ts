interface Course {
    id: number;
    title: string;
    code: string;
    teacher: string;
    timing: {
        day: number;
        startTime: string;
        endTime: string;
      }[];
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

// const primaryColor = '#1e88e5';

