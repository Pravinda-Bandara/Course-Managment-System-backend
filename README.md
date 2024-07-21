# Course Management System

## Version
0.1.0

## Introduction

Welcome to our Course Management System! This platform allows visitors to register and log in, after which they can explore and enroll in courses. Users can view course details and enroll in subjects of their choice. Admin users have additional privileges to manage users, courses, and student enrollments. Our backend, powered by the MERN stack (MongoDB, Express.js, React.js, Node.js), efficiently handles HTTP requests, user authentication using JWT (JSON Web Tokens), and database interactions.



## Models
#### User Model
- **Fields:** email, name, password, number, role
- **Description:** Represents a user in the system. Users can have roles 'student' or 'admin'.
#### Course Model
- **Fields:** title, description, duration, instructor, instructor_num
- **Description:** Represents a course in the system.
#### Enrollment Model
- **Fields:** studentId, courseId, studentEmail, courseName
- **Description:** Represents an enrollment in a course. Stores the ID of the student, the ID of the course, the student's email, and the course name.



### Routes
#### User Routes
- **GET /users:** Get all users (Admin)
- **GET /users/:id:** Get user by ID (Admin)
- **POST /users/signin:** Sign in (Visitor)
- **POST /users/signup:** Sign up (Visitor)
- **PATCH /users/:id:** Update user by ID (Admin)
- **DELETE /users/:id:** Delete user by ID (Admin)

#### Course Routes
- **GET /courses:** Get all courses (User)
- **GET /courses/:id:** Get course by ID (User)
- **POST /courses:** Create course (Admin) (User)
- **PATCH /courses/:id:** Update course by ID (Admin)
- **DELETE /courses/:id:** Delete course by ID (Admin)

#### Enrollment Routes
- **GET /enrollments/status:** Get enrollment status (User)
- **GET /enrollments/:studentId:** Get enrollments by student ID (User)
- **GET /enrollments/detailed/:studentId:** Get detailed enrollments by student ID (Admin)
- **POST /enrollments:** Create enrollment  (User)
- **DELETE /enrollments/:id:** Delete enrollment by ID (User)

## Backend Technologies Used
- **Framework:** Node.js with Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT)

## Usage Disclaimer

This project and its associated code are intended for educational and learning purposes only. Commercial use of the application is not permitted.


### License
Copyright &copy; 2024 Pravinda Bandara. All Right Reserved <br>
This Project is licensed under the [MIT](LICENSE.txt) License.


