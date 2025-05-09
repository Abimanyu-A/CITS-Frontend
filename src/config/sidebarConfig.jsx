import {
    FiHome,
    FiUser,
    FiSettings,
    FiClipboard,
    FiUsers,
    FiFileText,
    FiUserCheck,
    FiGrid,
    FiTrendingUp,
    FiInfo,
    FiChrome,
    FiScissors,
} from "react-icons/fi";

export const SIDEBAR_CONFIG = {
    employee: [
        { label: "Dashboard", path: "/dashboard", icon: <FiHome /> },
        { label: "My Profile", path: "/profile", icon: <FiUser /> },
        { label: "Documents", path: "/documents", icon: <FiFileText /> },
        { label: "Performance Review", path: "/review", icon: <FiInfo /> },
        { label: "My Attendance", path: "/attendence", icon: <FiChrome /> },
    ],
    manager: [
        { label: "Dashboard", path: "/dashboard", icon: <FiHome /> },
        { label: "Team", path: "/team-management", icon: <FiUsers /> },
        { label: "Reports", path: "/reports", icon: <FiClipboard /> },
        { label: "Settings", path: "/settings", icon: <FiSettings /> },
        { label: "Performance Review", path: "/review", icon: <FiInfo /> },
        { label: "Attendance Management", path: "/attendance-management", icon: <FiChrome /> },
    ],
    ceo: [
        { label: "Dashboard", path: "/dashboard", icon: <FiHome /> },
        { label: "Update Profile", path: "/profile-update", icon: <FiUser /> },
        { label: "Team Management", path: "/team-management", icon: <FiGrid /> },
        { label: "Employee Management", path: "/employee-management", icon: <FiUserCheck /> },
        { label: "Department Management", path: "/dept-management", icon: <FiTrendingUp /> },
        { label: "Performance Review", path: "/review", icon: <FiInfo /> },
        { label: "Attendance Management", path: "/attendance-management", icon: <FiChrome /> },
        { label: "My Attendance", path: "/attendence", icon: <FiScissors /> },
    ],
};
