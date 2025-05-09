import './App.css'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/auth/LoginPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import ProtectedRoute from './components/layout/ProtectedRoute';
import ProfileUpdatePage from './pages/profile/ProfileUpdatePage';
import DashboardLayout from './components/layout/DashboardLayout';
import RegisterEmployeePage from './pages/employee/RegisterEmployeePage';
import TeamManagementPage from './pages/team/TeamManagementPage';
import EmployeeManagementPage from './pages/employee/EmployeeManagementPage';
import DeptManagementPage from './pages/dept/DeptManagementPage';
import PerformanceReviewPage from './pages/review/PerformanceReviewPage';
import ProfilePage from './pages/profile/ProfilePage';
import AttendanceManagementPage from './pages/attendence/attendanceManagementPage';
import EmployeeAttendancePage from './pages/attendence/EmployeeAttendancePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/profile-update"
            element={
              <DashboardLayout>
                <ProfileUpdatePage />
              </DashboardLayout>
            }
          />
          <Route
            path="/register-employee"
            element={
              <DashboardLayout>
                <RegisterEmployeePage />
              </DashboardLayout>
            }
          />
          <Route
            path="/team-management"
            element={
              <DashboardLayout>
                <TeamManagementPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/employee-management"
            element={
              <DashboardLayout>
                <EmployeeManagementPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/dept-management"
            element={
              <DashboardLayout>
                <DeptManagementPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/review"
            element={
              <DashboardLayout>
                <PerformanceReviewPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <DashboardLayout>
                <ProfilePage />
              </DashboardLayout>
            }
          />
          <Route
            path="/attendance-management"
            element={
              <DashboardLayout>
                <AttendanceManagementPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/attendence"
            element={
              <DashboardLayout>
                <EmployeeAttendancePage />
              </DashboardLayout>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
