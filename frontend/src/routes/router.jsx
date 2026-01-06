import { createBrowserRouter } from "react-router-dom";
// Old imports (kept for dashboard compatibility)
import Home from "../pages/Home/Home";
import MainLayout from "../layout/MainLayout";
import Register from "../pages/user/Register";
import Login from "../pages/user/Login";
import Instructors from "../pages/Instructors/Instructors";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import ManageUsers from "../pages/Dashboard/Admin/users/ManageUsers";
import UpdateUser from "../pages/Dashboard/Admin/users/UpdateUser";
import Classes from "../pages/classes/Classes";
import ErrorPage from "../pages/error/ErrorPage";
import AddClass from "../pages/Dashboard/Instructors/AddClass";
import LeaderBoard from "../pages/Dashboard/Instructors/LeaderBoard";
import MyClasses from "../pages/Dashboard/Instructors/MyClasses";
import InstructorCP from "../pages/Dashboard/Instructors/InstructorCP";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import StudentCP from "../pages/Dashboard/Student/StudentCP";
import SelectedClass from "../pages/Dashboard/Student/SelectedClass";
import Payment from "../pages/Dashboard/Student/Payment/Payment";
import MyPaymentHistory from "../pages/Dashboard/Student/Payment/History/MyPaymentHistory";
import AsInstructor from "../pages/Dashboard/Student/Apply/AsInstructor";
import AdminRoute from "./Privet/AdminRoute";
import InstructorRoute from "./Privet/InstructorRoute";
import StudentRoute from "./Privet/StudentRoute";
import PrivetRoute from "./Privet/PrivetRoute";
import EnrolledClasses from "../pages/Dashboard/Student/Enroll/EnrolledClasses";
import UpdateClass from "../pages/Dashboard/Instructors/UpdateClass";
import SingleClass from "../pages/classes/SingleClass";
import ManageApplication from "../pages/Dashboard/Admin/Applications/ManageApplication";
import EnrollForm from "../pages/classes/EnrollForm";
import FormSubmission from "../pages/Dashboard/Instructors/FormSubmission/FormSubmission";

// New Gaming UI imports
import NewMainLayout from "../layout/NewMainLayout";
import NewHome from "../pages/Home/NewHome";
import Tournaments from "../pages/Tournaments/Tournaments";
import TournamentDetail from "../pages/Tournaments/TournamentDetail";
import HostTournament from "../pages/Tournaments/HostTournament";
import Teams from "../pages/Teams/Teams";
import Profile from "../pages/Profile/Profile";
import NewLogin from "../pages/user/NewLogin";
import NewRegister from "../pages/user/NewRegister";
import BecomeHost from "../pages/Host/BecomeHost";
import HostDashboard from "../pages/Dashboard/Host/HostDashboard";


export const router = createBrowserRouter([
    // New Gaming UI Routes
    {
        path: "/",
        element: <NewMainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <NewHome />
            },
            {
                path: "tournaments",
                element: <Tournaments />
            },
            {
                path: "tournament/:id",
                element: <TournamentDetail />
            },
            {
                path: "host-tournament",
                element: <InstructorRoute><HostDashboard /></InstructorRoute>
            },
            {
                path: "become-host",
                element: <BecomeHost />
            },
            {
                path: "teams",
                element: <PrivetRoute><Teams /></PrivetRoute>
            },
            {
                path: "profile",
                element: <PrivetRoute><Profile /></PrivetRoute>
            },
            {
                path: "register",
                element: <NewRegister />
            },
            {
                path: "login",
                element: <NewLogin />
            },
            // Legacy routes for backward compatibility
            {
                path: "instructors",
                element: <Instructors />
            },
            {
                path: "classes",
                element: <Tournaments />
            },
            {
                path: "form/:id",
                element: <EnrollForm />
            },
            {
                path: "class/:id",
                element: <TournamentDetail />
            }
        ]
    },
    // Old Main Layout (kept for legacy pages)
    {
        path: "/old",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "instructors",
                element: <Instructors />
            },
            {
                path: "classes",
                element: <Classes />
            },
            {
                path: "form/:id",
                element: <EnrollForm />
            },
            {
                path: "class/:id",
                element: <SingleClass/>,
                loader: ({ params }) => fetch(`http://localhost:3000/api/classes/${params.id}`),
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <PrivetRoute><Dashboard /></PrivetRoute>
            },
            // * ADMIN ROUTES
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: 'update-user/:id',
                element: <AdminRoute><UpdateUser /></AdminRoute>,
                loader: ({ params }) => fetch(`http://localhost:3000/api/users/${params.id}`),
            },
            {
                path: 'admin-home',
                element: <AdminRoute><AdminHome /></AdminRoute>
            },
            {
                path: 'manage-class',
                element: <AdminRoute><ManageClasses /></AdminRoute>
            },
            {
                path: 'manage-application',
                element: <AdminRoute><ManageApplication /></AdminRoute>
            },
            // * INSTRUCTOR ROUTES
            {
                path: 'instructor-cp',
                element: <InstructorRoute><InstructorCP /></InstructorRoute>
            },
            {
                path: 'add-class',
                element: <InstructorRoute><AddClass /></InstructorRoute>
            },
            {
                path: 'form-check',
                element: <InstructorRoute><FormSubmission /></InstructorRoute>
            },
            {
                path: 'add-leaderboard',
                element: <InstructorRoute><LeaderBoard /></InstructorRoute>
            },
            {
                path: 'my-classes',
                element: <InstructorRoute><MyClasses /></InstructorRoute>
            },
            {
                path: 'update/:id',
                element: <InstructorRoute><UpdateClass /></InstructorRoute>,
                loader: ({ params }) => fetch(`http://localhost:3000/api/classes/${params.id}`),
            },
            // * STUDENT ROUTES
            {
                path: 'student-cp',
                element: <StudentRoute><StudentCP /></StudentRoute>
            },
            {
                path: 'my-selected',
                element: <StudentRoute><SelectedClass /></StudentRoute>
            },
            {
                path: 'user/payment',
                element: <StudentRoute><Payment /></StudentRoute>
            },
            {
                path: 'my-payments',
                element: <StudentRoute><MyPaymentHistory /></StudentRoute>
            },
            {
                path: 'apply-instructor',
                element: <StudentRoute><AsInstructor /></StudentRoute>
            },
            {
                path: 'enrolled-class',
                element: <StudentRoute><EnrolledClasses /></StudentRoute>
            }
        ]
    }
])