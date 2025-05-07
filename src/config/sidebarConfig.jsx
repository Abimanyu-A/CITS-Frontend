import {
    FiHome,
    FiUser,
    FiSettings,
    FiClipboard,
    FiUsers,
    FiFileText,
    FiUserCheck,
    FiGrid,
} from "react-icons/fi";

export const SIDEBAR_CONFIG = {
    employee: [
        { label: "Dashboard", path: "/dashboard", icon: <FiHome /> },
        { label: "My Profile", path: "/profile-update", icon: <FiUser /> },
        { label: "Documents", path: "/documents", icon: <FiFileText /> },
    ],
    manager: [
        { label: "Dashboard", path: "/dashboard", icon: <FiHome /> },
        { label: "Team", path: "/team-management", icon: <FiUsers /> },
        { label: "Reports", path: "/reports", icon: <FiClipboard /> },
        { label: "Settings", path: "/settings", icon: <FiSettings /> },
    ],
    ceo: [
        { label: "Dashboard", path: "/dashboard", icon: <FiHome /> },
        { label: "Update Profile", path: "/profile-update", icon: <FiUser /> },
        { label: "Team Management", path: "/team-management", icon: <FiGrid /> },
        { label: "Employee Management", path: "/employee-management", icon: <FiUserCheck /> },
        { label: "Department Management", path: "/dept-management", icon: <FiUserCheck /> }
    ],
};
