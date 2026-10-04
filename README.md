# Student Hub

**Student Hub** is a full-stack student academic management portal for college students, built to bring semester planning, attendance tracking, "what-if" bunks planner, and grade management together in one place.

**Live application:** https://student-hub-portal-in.vercel.app/

> Stack:  **React · Node.js · Express · MySQL · JWT · bcrypt**  
> Deployment: **Vercel + Render + Aiven**



---


## 📑 Table of Contents

- [Problem](#the-problem)
- [Features](#features)
- [Special Feature: Plan Your Bunks](#special-feature)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Application Flow](#application-flow)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Run Locally](#run-locally)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Implementation Highlights](#implementation)
- [Future Improvements](#improvements)
- [My Learning](#what-i-learned)


---


## <a id="the-problem"></a>🎯 The Problem

Colleges often require students to maintain a minimum attendance percentage, and students end up tracking it in their heads or in scattered notes. Questions like *"How many classes can I still skip in this subject?"* or *"What happens to my attendance if I miss all of next week?"* are hard to answer, and CGPA is usually calculated by hand.

Student Hub answers these in one place. Set up a semester once (courses, weekly timetable, holidays, exams, working Saturdays) and the app builds the full attendance calendar for you, then tracks attendance, remaining bunks, SGPA and CGPA through the semester.

## <a id="features"></a>✨ Features

### 🔐 1. Authentication and User Accounts
- Register and log in with a user ID, name, email and password.
- Password hashing with `bcrypt`.
- `JWT-based authentication` for protected API requests.
- Protected frontend routes for authenticated users.
- Logged-in users are redirected away from the login and registration pages.

### 🗓️ 2. Semester Management
- Create multiple semesters, each with a name, start date and end date.
- Add courses with credits, and set the weekly timetable.
- Add **exams** and **holidays** as date ranges.
- Mark individual **Saturdays** as working days that follow a chosen weekday's timetable.
- Creating a semester auto-generates every attendance row for the whole semester.
- View a semester summary (courses, total credits, total class hours) and delete a semester after confirmation.

### 📊 3. Attendance Tracking
- View attendance: day-wise and by course-wise.
- Select dates across the semester and view the scheduled classes for that day.
- Mark class hours as **Present**, **Absent**, or **Not Marked**.
- Review course-wise attendance summaries.
- Save attendance changes with a confirmation step.
- Saved Present/Absent entries are locked from further editing in the regular attendance page. The planner is available for experimenting with possible changes.

### 🎓 4. Grades and CGPA
- View and update course grades grouped by semester.
- Calculate semester-wise SGPA and overall CGPA using course credits and the grade-point mapping implemented in the backend.

### 🏠 5. Dashboard and Semester Overview
- A central home page for academic information.
- Semester selection and semester-specific navigation.
- A semester dashboard for viewing relevant academic details.
- Reusable layouts and components to keep navigation consistent.


---


## <a id="special-feature"></a>🚀 Special Feature: Plan Your Bunks

**Plan Your Bunks** is an attendance "what-if" simulator. Students can temporarily change a past or future class hour to Present, Absent, or Not Marked and see how the scenario affects attendance and remaining bunks—without changing saved records.

### 🧪 What students can do
- Experiment with marking class hours as Present, Absent, or Not Marked.
- Try different attendance scenarios for individual days and courses.
- See how the changes affect course-wise attendance summaries.
- Check the calculated bunk allowance and remaining bunks for each course.
- Explore different possibilities without saving those changes to the database.

### ⚙️ How it works
1. The planner retrieves the attendance rows for the selected semester.
2. The user changes statuses in the planner interface.
3. The planner recalculates its summary from the modified in-memory data.
4. The student can continue experimenting or leave the page. The simulated changes are not submitted as saved attendance updates.

Based on the app’s current **75% attendance assumption**, the planner allows a bunk allowance of **25% of the course’s total scheduled hours**, rounded down. The planner subtracts the course's recorded absences from that allowance to calculate remaining bunks, with negative remaining values displayed as zero.

> **Important:** Plan Your Bunks is a simulation tool. Its changes are temporary and do not update saved attendance. Use the regular Attendance page to record actual attendance.


---


## <a id="tech-stack"></a>🧰 Tech Stack

| Area | Technology |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Routing | React Router |
| State management | React Context API and React hooks |
| HTTP requests | Axios |
| Icons | Lucide React |
| Backend | Node.js, Express |
| Database | MySQL, accessed with `mysql2` (promise API, connection pool) |
| Auth and security | JSON Web Tokens (`jsonwebtoken`), `bcrypt`, CORS allow-list |
| Config | `dotenv` |
| Hosting | Vercel (frontend), Render (backend), Aiven (managed MySQL) |


---


## <a id="project-structure"></a>🗂️ Project Structure

The repository separates the frontend and backend into two application folders:

```text
student-hub/
├── frontend/
│   ├── api/
│   │   ├── axios.js
│   │   ├── authApi.js
│   │   ├── semesterApi.js
│   │   ├── attendanceApi.js
│   │   └── gradeApi.js
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── addsem/
│   │   │   ├── attendance/
│   │   │   ├── dashboard/
│   │   │   ├── grades/
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── routes/
│   │   ├── context/
│   │   ├── images/
│   │   ├── Pages/
│   │   ├── Utils/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── config/
    │   │   └── database.js
    │   ├── controllers/
    │   │   ├── attendanceController.js
    │   │   ├── authController.js
    │   │   ├── gradeController.js
    │   │   ├── semesterController.js
    │   │   └── userDetailsController.js
    │   ├── middlewares/
    │   │   ├── authMiddleware.js
    │   │   └── verifyMiddleware.js
    │   ├── models/
    │   │   ├── attendanceModel.js
    │   │   ├── calendarModel.js
    │   │   ├── courseModel.js
    │   │   ├── gradesModel.js
    │   │   ├── scheduleModel.js
    │   │   ├── semesterModel.js
    │   │   └── userModel.js
    │   ├── routes/
    │   │   ├── attendanceRoutes.js
    │   │   ├── gradeRoutes.js
    │   │   ├── semesterRoutes.js
    │   │   └── userRoutes.js
    │   └── app.js
    └── package.json
```


### 🖥️ Frontend organization
- **`api/`** – Axios configuration and functions grouped by backend resource.
- **`Components/`** – Reusable UI components, grouped by feature.
- **`Pages/`** – Page-level components used by the router.
- **`context/`** – Shared semester state used across relevant pages.
- **`Utils/`** – Date formatting, month generation, Saturday-date, and course utilities.
- **`App.jsx`** – Application routes, authentication redirects, and protected layout.

### 🛠️ Backend organization
- **`routes/`** – Maps HTTP methods and URL paths to middleware and controllers.
- **`controllers/`** – Handles requests, coordinates operations, and sends HTTP responses.
- **`models/`** – Contains database operations and SQL queries.
- **`middlewares/`** – Authentication and User verification.
- **`config/`** – MySQL connection pool configuration.
- **`app.js`** – Configures Express, CORS, JSON parsing, API route mounting, and the server.


---


## <a id="application-flow"></a>🔄 Application Flow

```text
User's Browser
      |
      | React + Vite application
      | Hosted on Vercel
      |
      | HTTPS API requests (Axios)
      | JWT sent in Authorization header
      v
Express REST API
      |
      | Hosted on Render
      | Authentication / Verification middleware
      | Routes -> Controllers -> Models
      v
MySQL Database
      |
      | Aiven managed MySQL
      v
API response returned to the frontend
```

The browser communicates with the Express API. It does **not** connect directly to MySQL. Database credentials remain on the backend and are configured through Render environment variables.


---


## <a id="api-endpoints"></a>🔌 API Endpoints

The backend mounts its routes under `/api`. Replace `BACKEND_URL` with your deployed Render service URL or your local backend address.

| Method | Endpoint | Authentication | Purpose |
|---|---|---|---|
| `POST` | `/api/users/register` | No | Register a user |
| `POST` | `/api/users/login` | No | Verify credentials and return an access token |
| `GET` | `/api/users/user-details` | JWT | Get authenticated user details |
| `POST` | `/api/semesters/add` | JWT | Create a semester and initialize its related academic data |
| `GET` | `/api/semesters` | JWT | Get the authenticated user's semesters |
| `GET` | `/api/semesters/sem-summary/:semId` | JWT + semester verification | Get semester course and attendance summary |
| `DELETE` | `/api/semesters/delete/:semId` | JWT + semester verification | Delete a semester |
| `GET` | `/api/attendance/get/:semId/:date` | JWT + semester verification | Get attendance rows for a semester and date |
| `PATCH` | `/api/attendance/update/:semId` | JWT + semester verification | Save attendance changes |
| `GET` | `/api/attendance/get/course-summary/:semId` | JWT + semester verification | Get course-wise attendance summary |
| `GET` | `/api/attendance/get/plan-your-bunks/:semId` | JWT + semester verification | Retrieve attendance rows for bunk planning |
| `GET` | `/api/grades/get` | JWT | Get grades and calculated SGPA/CGPA |
| `PATCH` | `/api/grades/update` | JWT | Update course grades |

### 🔑 Authentication

For protected endpoints, the frontend attaches the access token as a Bearer token:

```http
Authorization: Bearer <access_token>
```

### 🌐 API base URL

The frontend reads its API base URL from the Vite environment variable `VITE_API_URL`. Configure it to point to the backend API base, including `/api` if that is how the backend is exposed. For example:

```text
VITE_API_URL=https://your-render-service.onrender.com/api
```


---


## <a id="database"></a>🗄️ Database

Student Hub uses **MySQL** for persistent application data. The backend accesses it through a `mysql2` promise-based connection pool.

The database models cover the following areas:

| Table | Purpose |
|---|---|
| `users` | Account details and `password_hash` |
| `semesters` | Owner, name, start and end date |
| `courses` | Course name and credits, per semester |
| `schedules` | Which course is taught on which weekday, at which hour slot |
| `calendar` | Holidays, exams and working-Saturday overrides, with a numeric `code` |
| `attendance` | One row per class hour per date: `status` and `editable` |
| `grades` | One grade per course, used for SGPA/CGPA |

<details>
<summary><b>SQL schema</b></summary>


```sql
CREATE TABLE users (
    user_id VARCHAR(50) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id),
    UNIQUE KEY (email)
);

CREATE TABLE semesters (
    sem_id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(50) NOT NULL,
    sem_name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    PRIMARY KEY (sem_id),
    UNIQUE KEY (uq_user_semester) (user_id, sem_name),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CHECK (start_date < end_date)
);

CREATE TABLE courses (
    course_id INT NOT NULL AUTO_INCREMENT,
    sem_id INT NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    course_credits INT NOT NULL,
    PRIMARY KEY (course_id),
    UNIQUE KEY (unique_course_name) (sem_id, course_name),
    FOREIGN KEY (sem_id) REFERENCES semesters(sem_id) ON DELETE CASCADE,
    CHECK (course_credits > 0)
);

CREATE TABLE schedules (
    schedule_id INT NOT NULL AUTO_INCREMENT,
    sem_id INT NOT NULL,
    course_id INT NOT NULL,
    day TINYINT NOT NULL,
    hour TINYINT NOT NULL,
    PRIMARY KEY (schedule_id),
    UNIQUE KEY (unique_schedule_slot) (sem_id, day, hour),
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    FOREIGN KEY (sem_id) REFERENCES semesters(sem_id) ON DELETE CASCADE,
    CHECK (day BETWEEN 1 AND 5),
    CHECK (hour > 0)
);

CREATE TABLE calendar (
    calendar_id INT NOT NULL AUTO_INCREMENT,
    sem_id INT NOT NULL,
    event_date DATE NOT NULL,
    code TINYINT NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (calendar_id),
    UNIQUE KEY (sem_id, event_date),
    FOREIGN KEY (sem_id) REFERENCES semesters(sem_id) ON DELETE CASCADE,
    CHECK (code IN (1, 2, 3))
);

CREATE TABLE attendance (
    attendance_id INT NOT NULL AUTO_INCREMENT,
    sem_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    schedule_id INT NOT NULL,
    status TINYINT NOT NULL DEFAULT 0,
    editable TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (attendance_id),
    UNIQUE KEY (attendance_date, schedule_id),
    FOREIGN KEY (schedule_id) REFERENCES schedules(schedule_id) ON DELETE CASCADE,
    FOREIGN KEY (sem_id) REFERENCES semesters(sem_id) ON DELETE CASCADE,
    CHECK (status IN (-1, 0, 1)),
    CHECK (editable IN (0, 1))
);

CREATE TABLE grades (
    grade_id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(50) NOT NULL,
    sem_id INT NOT NULL,
    course_id INT NOT NULL,
    grade CHAR(2) NOT NULL,
    PRIMARY KEY (grade_id),
    UNIQUE KEY (user_id, sem_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (sem_id) REFERENCES semesters(sem_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);
```
</details>

### 🧩 How Semester Setup Generates Attendance

This is the core data-modelling logic of the project. When a user saves a new semester, **one database transaction** does the following in order:

1. Insert the **semester**.
2. Insert its **courses** and get their generated IDs.
3. Insert the weekly **schedule**: one row per course, per weekday, per hour slot.
4. Insert **calendar events**: holidays (code `1`), exams (code `2`) and working Saturdays (code `3`, which stores which weekday's timetable it follows).
5. **Generate attendance**: walk every date from start to end. Sundays, holidays and exam days are skipped. Every other day gets one row per scheduled hour, with status `0` (Not Marked). A working Saturday uses the timetable of the weekday it was assigned.
6. Insert a **grade** row for every course.

If any step fails, the whole transaction is **rolled back**, so there are never half-created semesters.


The project intentionally uses **SQL queries in the backend models** rather than relying on an ORM. This was a deliberate learning choice to gain practical experience with MySQL, query writing, joins, data manipulation, and transactions.

**Highlights**
- **Raw SQL, no ORM**, written deliberately to learn joins, aggregation (`COUNT`, `SUM(CASE ...)`, `GROUP BY`), bulk inserts and transactions.
- **Parameterized queries** (`?` placeholders) everywhere, which protects against SQL injection.
- **Transactions** (`beginTransaction / commit / rollback`) for semester creation, attendance saves and grade saves.
- **Bulk inserts** (`INSERT ... VALUES ?`) so a whole semester's attendance goes in with one query instead of hundreds.


---



## <a id="run-locally"></a>💻 Run Locally

### 📋 Prerequisites
- Node.js and npm
- MySQL server, either local or managed
- Git

### 1. 📥 Clone the repository

```bash
git clone https://github.com/siddharthbuilds/STUDENT-HUB.git
cd STUDENT-HUB
```

### 2. 🛠️ Start the backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory using the variables listed in [Environment Variables](#environment-variables).

Start the backend:

```bash
npm start
```

For development with automatic restart, use the development script configured in your backend `package.json`:

```bash
npm run dev
```

The Express server uses `process.env.PORT`, with port `5000` as its local fallback.

### 3. 🖥️ Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start Vite:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### 4. 📦 Build the frontend

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```


---


## <a id="environment-variables"></a>⚙️ Environment Variables

Do not commit `.env` files, database passwords, or JWT secrets to Git.

### 🛠️ Backend

Configure these variables in the backend `.env` file locally and in the Render service environment settings after deployment:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173

DB_host=your_mysql_host
DB_port=your_mysql_port
DB_user=your_mysql_user
DB_password=your_mysql_password
DB_database=your_database_name

ACCESS_TOKEN=replace_with_a_long_random_secret
```

- `PORT` is supplied by Render in production; the backend uses it automatically.
- `FRONTEND_URL` must match the deployed frontend origin in production.
- `DB_*` variables provide the MySQL connection settings.
- `ACCESS_TOKEN` is used to sign JWT access tokens. Keep it private and use a strong random value.

The current database configuration enables TLS for the MySQL connection. For production systems with a trusted CA certificate available, certificate verification should be configured rather than disabling certificate verification.

### 🖥️ Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

For the deployed frontend, set `VITE_API_URL` to the deployed Render API base URL, including `/api`.

Vite variables prefixed with `VITE_` are included in the client-side bundle. **Never place secrets, database credentials, or private API keys in frontend environment variables.**


---


## <a id="deployment"></a>🚀 Deployment

Student Hub is deployed as three separate services:

| Part | Platform | Role |
|---|---|---|
| Frontend | [Vercel](https://vercel.com/) | Hosts the React/Vite application |
| Backend | [Render](https://render.com/) | Runs the Node.js/Express API |
| Database | [Aiven](https://aiven.io/) | Hosts the managed MySQL database |

### 🌍 Live frontend

**https://student-hub-portal-in.vercel.app/**

### 🚀 Deployment configuration
- The frontend is built with Vite and deployed to Vercel.
- The backend runs as an Express service on Render.
- The backend connects to Aiven MySQL using server-side environment variables and TLS.
- The frontend uses `VITE_API_URL` to send requests to the Render API.
- The backend uses `FRONTEND_URL` to configure CORS for the deployed frontend origin.
- JWT authentication is used for protected API requests.

For deployment, set the production environment variables in Vercel and Render. Redeploy the frontend after changing `VITE_API_URL` so the updated value is included in the build.


---


## <a id="implementation"></a>🧠 Implementation Highlights

- **Feature-based structure:** Frontend components are grouped by academic workflow, making the codebase easier to navigate and extend.
- **Authentication and access control:** JWT verification and semester ownership checks are handled through backend middleware.
- **Separation of concerns:** Express routes, controllers, models, and database configuration each have a focused responsibility.
- **SQL-first approach:** Database operations are written directly in SQL, with parameterized values rather than string-built queries.
- **Consistent multi-table writes:** Transactions help keep semester creation and related attendance, grade, and schedule data in sync.
- **Deployment separation:** The frontend, API server, and database run as separate services, with configuration supplied through environment variables.

---


## <a id="improvements"></a>🔭 Future Improvements

Possible directions for future development include:


- **Automatic Attendance Schedule Parsing:** Extract semester dates, holidays, and working Saturdays directly from uploaded PDFs, eliminating the need for users to enter schedule details manually.
- **Attendance insights:** Visualize attendance trends over time and highlight courses approaching the attendance limit.
- **Smarter bunk planner:** Add scenario comparison, configurable attendance thresholds, and clearer projections for upcoming classes.
- **Calendar integration:** Export semester schedules, exams, and holidays to calendar applications.
- **Notifications and reminders:** Remind students about classes, assessments, attendance thresholds, and academic deadlines.
- **More detailed analytics:** Add semester-wise performance charts, grade trends, and credit summaries.
- **Data export and backup:** Allow students to export attendance, grades, and semester information.
- **Improved account management:** Add profile settings, password reset, and account security options.
- **Automated testing:** Add frontend and backend tests for authentication, semester creation, attendance updates, and grade calculations.
- **Enhanced validation and error handling:** Improve input validation, API error consistency, and user-facing feedback.
- **Accessibility and mobile experience:** Continue improving keyboard navigation, screen-reader support, and small-screen layouts.


---



## <a id="what-i-learned"></a>📚 What I Learned

Building Student Hub provided hands-on practice with the complete lifecycle of a full-stack application—from modelling academic data and building the interface to debugging API communication and deploying separate services.

Key areas of learning included:

- **JWT:** how stateless auth works, what goes in a token, signing and verifying, expiry, and why authentication and authorization are different problems.
- **bcrypt:** why passwords are hashed rather than encrypted, salting, cost factor, and comparing hashes safely.
- **Relational design:** modelling users, semesters, courses, schedules, calendar and attendance with foreign keys, and writing joins and aggregates by hand.
- **Transactions:** keeping multi-table writes consistent with commit and rollback.
- **Express architecture:** routes, middleware chains, and controller/model separation.
- **React:** component design, Context API, protected routes with React Router, and Axios interceptors.
- **Deployment:** wiring three separate services together (Vercel, Render, Aiven), plus CORS, environment variables and build-time vs run-time config.
- **Debugging real issues:** date and timezone handling, CORS errors, and environment differences between local and production.

---


## 👨‍💻 Author

**Siddharth Krishna**  


---


*Student Hub is an academic management project built for learning, experimentation, and practical use.*
