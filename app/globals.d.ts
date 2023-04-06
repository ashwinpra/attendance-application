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

// const primaryColor = '#1e88e5';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    header: {
      borderRadius: 10,
      padding: 10,
      marginBottom: 20,
    },
    courseName: {
      color: 'black',
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    courseCode: {
      color: 'gray',
      textAlign: 'center',
      fontSize: 24,
      fontStyle: 'italic',
      marginBottom: 5,
    },
    courseTeacher: {
      color: 'gray',
      textAlign: 'center',
      fontSize: 20,
    },
    attendanceButton: {
      backgroundColor: '#1e88e5',
      borderRadius: 5,
      padding: 10,
      alignSelf: 'center',
    },
    attendanceButtonText: {
      color: '#FFF',
      fontSize: 20,
    },
    attendancePeriodInactive: {
      fontSize: 16,
      color: '#666',
      alignSelf: 'center',
    },
    
    attendanceRecord: {
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 50,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      alignSelf: 'center'
    },
  });