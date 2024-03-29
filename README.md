# Attendance Application

Team Project for Software Engineering Laboratory Course (CS29202) 2023

## Team Members:

- Sanskar Mittal (21CS10057)
- Yash Sirvi (21CS10083)
- Ashwin Prasanth (21CS30009)

## Running Locally 
- Clone the repository
- Run `npm i`
- Run `npx expo start` and follow the instructions on the terminal

---

## Assignment 1

- Deadline: **27th March 2023**

- Refer to [this](docs/PA-1.pdf) document for the assignment statement
- Additional helpful documents:
  - [IEEE Recommended Practise for SRS](docs/IEEE_Std_830-1998-Recommended_Practice_for_SRS.pdf)
  - [Class and Use-case diagrams](docs/SRS-diagrams.pdf)
  - [Sample SRS document](docs/SRSExample-webapp.pdf)

## Assignment 2

- Deadline: **3rd April 2023 11:59PM**

- Refer to [this](docs/PA-2.pdf) document for the assignment statement

- Additional helpful document: [IEEE Test Plan Outline](docs/ieee-829.pdf)

## Final Submission

- Presentation and Final Date: 09 April 2023 - 4:15-4:30pm

# Instructions

- In this project, an application should be developed which is used to save time in taking attendance.
- It should work with a unique code which was set by the attendance taker and will be announced to
  all the attendees.
- Implement should be done both server side and the client side.
- User Types:

  1. Who wants to take the attendance
     a) Generally teacher. Teacher generates a unique code which will be given in class.
  2. Who gives the attendance
     a) Generally students. They enter the code given by the teacher in class to mark their attendance.
  3. Developer who update the software
     a) Maintains and creates the classes and other technical issues.

- **Requirements of student:**

  1. Students should get all the statistics of the classes he attended.
  2. Students can mark the attendance in the time span allotted. (only if code matches with the
     unique code generated by Teacher)

- **Requirements of teacher:**

  1. Get the statistics of all the classes he teaches.
  2. Start the attendance.
  3. Get possible proxies(Detect multiple attendances from the same IP)

- **Requirements of Admin:**

  1. Can create/delete/modify a course from the database.

- **Android application requirements:**
  1. Any user should have his own login/registration credentials.
  2. Option to login as student or teacher or admin
  3. Three different interfaces should be generated for all the three users for their tasks.

---

> Google doc for link and reference -> [link](https://docs.google.com/document/d/1yZWlhtrrhh2Dk3q_OpjmJ9R0n01IHoYPaeoaYwg1zbM/edit?usp=sharing)

> Latex document for SRS -> [link](https://www.overleaf.com/9937867742kctfsgcjkwdd) (Reference taken from PA-1.pdf)
