import { NavLink } from "react-router-dom";
import { SIDEBAR_CONFIG } from "../../config/sidebarConfig";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { FiLogOut, FiChevronRight, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const user = useSelector((state) => state.auth.user?.data);
  const employee = useSelector((state) => state.emp.employee);
  const role = user?.role;
  const links = SIDEBAR_CONFIG[role] || [];
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile); // Open on desktop, closed on mobile by default
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-primary-content p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Full Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={toggleSidebar}
                className="fixed inset-0 bg-black z-30 md:hidden"
              />
            )}

            <motion.aside
              initial={{ x: isMobile ? -300 : 0 }}
              animate={{ x: 0 }}
              exit={{ x: isMobile ? -300 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`w-64 bg-primary-content h-screen p-6 flex flex-col justify-between fixed backdrop-blur-sm border-r border-base-100/10 z-40 ${
                isMobile ? "shadow-xl" : ""
              }`}
            >
              <div>
                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-bold text-xl mb-8 text-primary"
                >
                  CITS
                </motion.div>

                {/* User Info */}
                {user && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-8 p-3 bg-base-100/10 rounded-lg"
                  >
                    <div className="avatar">
                      <div className="w-12 rounded-full border-2 border-primary/30">
                        <img src={employee.photo} alt="User Avatar" />
                      </div>
                    </div>
                    <div className="truncate">
                      <p className="font-medium truncate">
                        {employee.firstName} {employee.lastName}
                      </p>
                      <p className="text-xs opacity-70 capitalize">{role}</p>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Links */}
                <nav className="space-y-1">
                  {links.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={() => isMobile && setIsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                            isActive
                              ? "bg-primary/20 text-primary font-medium"
                              : "hover:bg-base-100/10"
                          }`
                        }
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{link.icon}</span>
                          <span>{link.label}</span>
                        </div>
                        <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Logout Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-base-100/10 hover:bg-error/20 hover:text-error transition-all group"
                >
                  <FiLogOut className="text-lg" />
                  <span>Logout</span>
                  <FiChevronRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Compact Sidebar for Mobile when closed */}
      {isMobile && !isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed left-0 top-0 h-screen w-16 bg-primary-content/80 backdrop-blur-sm border-r border-base-100/10 z-30 flex flex-col items-center pt-20 space-y-6"
        >
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `p-3 rounded-lg transition-all ${
                  isActive ? "bg-primary/20 text-primary" : "hover:bg-base-100/10"
                }`
              }
              title={link.label}
            >
              <span className="text-lg">{link.icon}</span>
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="p-3 rounded-lg hover:bg-error/20 hover:text-error mt-auto mb-6"
            title="Logout"
          >
            <FiLogOut className="text-lg" />
          </button>
        </motion.div>
      )}
    </>
  );
}