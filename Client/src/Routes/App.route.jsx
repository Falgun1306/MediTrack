import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import LoginPage from "../Pages/LoginPage"
import SignUpPage from "../Pages/SignUpPage"
import DashboardPage from "../Pages/DashBoardPage"
import FamilyPage from "../Pages/FamilyPage"
import MedicinePage from "../Pages/MedicinePage"
import ProtectedRoute from "./protected.route"
import PublicRoute from "./PublicRoute.route"
import AllMedicine from "../Features/Medicine/AllMedicine"
import NotificationPage from "../Pages/NotificationPage"

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/login',
                element: (
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                )
            },
            {
                path: '/register',
                element: (
                    <PublicRoute>
                        <SignUpPage />
                    </PublicRoute>
                )
            },
            {
                path: '/',
                element: (
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                )
            },
            {
                path: '/family',
                element: (
                    <ProtectedRoute>
                        <FamilyPage />
                    </ProtectedRoute>
                )
            },
            {
                path: '/medicines',
                element: (
                    <ProtectedRoute>
                        <MedicinePage />
                    </ProtectedRoute>
                )
            },
            {
                path: '/all-medicines',
                element: (
                    <ProtectedRoute>
                        <AllMedicine />
                    </ProtectedRoute>
                )
            },{
                path: '/all-notifications',
                element: (
                    <ProtectedRoute>
                        <NotificationPage/>
                    </ProtectedRoute>
                )
            }
        ]
    }
])


export default router;