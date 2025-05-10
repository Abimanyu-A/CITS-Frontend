import { useState } from "react";
import { motion } from "framer-motion";
import { FiClock, FiUsers, FiDollarSign, FiChevronDown, FiChevronUp, FiRefreshCw } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { getDeptVersions, revertDeptVersion } from "../../features/dept/deptThunk";
import { format } from "date-fns";

const DeptDetails = ({ dept, onClose }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("current");
  const [versions, setVersions] = useState([]);
  const [loadingVersions, setLoadingVersions] = useState(false);
  console.log(dept)
  const teams = Array.isArray(dept?.HandlingTeams)
  ? dept.HandlingTeams
  : Object.values(dept?.HandlingTeams || {});
  console.log(teams)
  const [expandedSections, setExpandedSections] = useState({
    heads: false,
    budgets: false,
    teams: false,
    currentTeams: true
  });

  const loadVersions = async () => {
    if (!dept?._id) return;
    setLoadingVersions(true);
    try {
      const result = await dispatch(getDeptVersions(dept._id)).unwrap();
      setVersions(result.data);
    } finally {
      setLoadingVersions(false);
    }
  };

  const handleRevert = async (versionId) => {
    try {
      await dispatch(revertDeptVersion({ deptId: dept._id, versionId })).unwrap();
      // Refresh data by reloading versions
      loadVersions();
    } catch (error) {
      console.error("Failed to revert:", error);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!dept) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden lg:block lg:col-span-2 bg-base-100 rounded-lg shadow-lg p-6"
      >
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h3 className="text-xl font-medium mb-2">No Department Selected</h3>
          <p className="text-gray-400">
            Select a department from the list to view details
          </p>
        </div>
      </motion.div>
    );
  }

  // Extract unique changes from versions
  const headChanges = versions
    .filter(v => v.data.DeptHeadID)
    .map(v => ({
      head: v.data.DeptHeadID,
      date: v.createdAt,
      version: v.version
    }));

  const budgetChanges = versions
    .filter(v => v.data.Budget)
    .map(v => ({
      budget: v.data.Budget,
      date: v.createdAt,
      version: v.version
    }));

  const teamChanges = versions
    .filter(v => v.data.HandlingTeams)
    .map(v => ({
      team: v.data.HandlingTeams,
      date: v.createdAt,
      version: v.version
    }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="lg:col-span-2 bg-base-100 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-4 bg-base-200 border-b border-base-300 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{dept.DeptName}</h2>
        <button
          onClick={onClose}
          className="lg:hidden text-gray-400 hover:text-gray-300"
        >
          Close
        </button>
      </div>
      
      <div className="p-6">
        <div className="tabs tabs-boxed mb-6">
          <button
            className={`tab ${activeTab === 'current' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            Current Info
          </button>
          <button
            className={`tab ${activeTab === 'history' ? 'tab-active' : ''}`}
            onClick={() => {
              setActiveTab('history');
              if (!versions.length) loadVersions();
            }}
          >
            Version History
          </button>
        </div>

        {activeTab === 'current' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-base-200 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Department Information</h3>
                <div className="space-y-2">
                  <p>
                    <span className="text-gray-400">Name:</span> {dept.DeptName}
                  </p>
                  <p>
                    <span className="text-gray-400">Budget:</span> ${dept.Budget?.toLocaleString()}
                  </p>
                  <p>
                    <span className="text-gray-400">Created At:</span>{" "}
                    {format(new Date(dept.createdAt), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
              
              <div className="bg-base-200 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Department Head</h3>
                {dept.DeptHeadID ? (
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-400">Name:</span>{" "}
                      {dept.DeptHeadID?.firstName} {dept.DeptHeadID?.lastName}
                    </p>
                    <p>
                      <span className="text-gray-400">Email:</span>{" "}
                      {dept.DeptHeadID?.email}
                    </p>
                    <p>
                      <span className="text-gray-400">Position:</span>{" "}
                      {dept.DeptHeadID?.position}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400">No department head assigned</p>
                )}
              </div>
            </div>

            {/* Current Teams Section */}
            <div className="bg-base-200 p-4 rounded-lg">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('currentTeams')}
              >
                <h3 className="text-lg font-medium">Current Teams</h3>
                {expandedSections.currentTeams ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedSections.currentTeams && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  {dept.HandlingTeams?.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="table w-full">
                        <thead>
                          <tr>
                            <th>Team Name</th>
                            <th>Team Lead</th>
                            <th>Members</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teams.map((team) => (
                            <tr key={team._id}>
                              <td>{team.name}</td>
                              <td>
                                {team.teamLead ? 
                                  `${team.teamLead.firstName} ${team.teamLead.lastName}` : 
                                  'Not assigned'}
                              </td>
                              <td>{team.members?.length || 0}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-400 py-2">No teams assigned to this department</p>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex justify-end">
              <button
                onClick={loadVersions}
                className="btn btn-sm btn-ghost"
                disabled={loadingVersions}
              >
                <FiRefreshCw className={`mr-2 ${loadingVersions ? 'animate-spin' : ''}`} />
                Refresh History
              </button>
            </div>

            {/* Department Heads History */}
            <motion.div 
              layout
              className="collapse collapse-plus bg-base-200 rounded-box"
            >
              <input 
                type="checkbox" 
                checked={expandedSections.heads}
                onChange={() => toggleSection('heads')}
              />
              <div className="collapse-title flex items-center gap-2 text-lg font-medium">
                <FiUsers />
                <span>Department Heads History</span>
                {expandedSections.heads ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              <div className="collapse-content">
                {loadingVersions ? (
                  <div className="text-center py-4">Loading...</div>
                ) : headChanges.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="table table-zebra">
                      <thead>
                        <tr>
                          <th>Head</th>
                          <th>Changed On</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {headChanges.map((change, idx) => (
                          <tr key={idx}>
                            <td>{change.head?.firstName} {change.head?.lastName}</td>
                            <td>{format(new Date(change.date), 'MMM dd, yyyy HH:mm')}</td>
                            <td>
                              <button 
                                onClick={() => handleRevert(change.version)}
                                className="btn btn-xs btn-primary"
                              >
                                Revert
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="py-2 text-gray-400">No head changes recorded</p>
                )}
              </div>
            </motion.div>

            {/* Budget History */}
            <motion.div 
              layout
              className="collapse collapse-plus bg-base-200 rounded-box"
            >
              <input 
                type="checkbox" 
                checked={expandedSections.budgets}
                onChange={() => toggleSection('budgets')}
              />
              <div className="collapse-title flex items-center gap-2 text-lg font-medium">
                <FiDollarSign />
                <span>Budget History</span>
                {expandedSections.budgets ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              <div className="collapse-content">
                {loadingVersions ? (
                  <div className="text-center py-4">Loading...</div>
                ) : budgetChanges.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="table table-zebra">
                      <thead>
                        <tr>
                          <th>Amount</th>
                          <th>Changed On</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {budgetChanges.map((change, idx) => (
                          <tr key={idx}>
                            <td>${change.budget?.toLocaleString()}</td>
                            <td>{format(new Date(change.date), 'MMM dd, yyyy HH:mm')}</td>
                            <td>
                              <button 
                                onClick={() => handleRevert(change.version)}
                                className="btn btn-xs btn-primary"
                              >
                                Revert
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="py-2 text-gray-400">No budget changes recorded</p>
                )}
              </div>
            </motion.div>

            {/* Teams History */}
            <motion.div 
              layout
              className="collapse collapse-plus bg-base-200 rounded-box"
            >
              <input 
                type="checkbox" 
                checked={expandedSections.teams}
                onChange={() => toggleSection('teams')}
              />
              <div className="collapse-title flex items-center gap-2 text-lg font-medium">
                <FiUsers />
                <span>Teams History</span>
                {expandedSections.teams ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              <div className="collapse-content">
                {loadingVersions ? (
                  <div className="text-center py-4">Loading...</div>
                ) : teamChanges.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="table table-zebra">
                      <thead>
                        <tr>
                          <th>Team</th>
                          <th>Changed On</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamChanges.map((change, idx) => (
                          <tr key={idx}>
                            <td>{change.team?.name}</td>
                            <td>{format(new Date(change.date), 'MMM dd, yyyy HH:mm')}</td>
                            <td>
                              <button 
                                onClick={() => handleRevert(change.version)}
                                className="btn btn-xs btn-primary"
                              >
                                Revert
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="py-2 text-gray-400">No team changes recorded</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DeptDetails;