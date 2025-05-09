import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { getAllTeams, deleteTeam, createTeam, updateTeam } from "../../features/team/teamThunk";
import { resetTeams } from "../../features/team/teamSlice";
import TeamList from "../../components/team/TeamList";
import TeamDetails from "../../components/team/TeamDetails";
import Modal from "../../components/modal/Modal";
import TeamForm from "../../components/team/TeamForm";
import Button from "../../components/element/Button";
import LoadingPage from "../../components/layout/LoadingPage";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const TeamManagementPage = () => {
  const dispatch = useDispatch();
  const { teams, status, error, hasFetched } = useSelector((state) => state.team);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [teamToEdit, setTeamToEdit] = useState(null);
  const [newTeam, setNewTeam] = useState({
    teamName: '',
    description: '',
    teamLead: '',
    department: ''
  });
  const employees = useSelector((state) => state.emp.allEmployees.data);
  const departments = useSelector((state) => state.dept.depts);
  const [errors, setErrors] = useState({
    teamName: '',
    description: '',
    teamLead: '',
    department: ''
  });

  useEffect(() => {
    if (!hasFetched) {
      dispatch(getAllTeams());
    }
  }, [dispatch, hasFetched]);

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [error]);

  const validateForm = (teamData) => {
    let valid = true;
    const newErrors = { name: '', description: '', teamLead: '', department: '' };
  
    if (!teamData.name.trim()) {
      newErrors.name = 'Team name is required';
      valid = false;
    }
  
    if (!teamData.description.trim()) {
      newErrors.description = 'Description is required';
      valid = false;
    }
  
    if (!teamData.teamLead) {
      newErrors.teamLead = 'Team lead is required';
      valid = false;
    }
  
    if (!teamData.department) {
      newErrors.department = 'Department is required';
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };

  const handleCreateTeam = async (e, formData) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
  
    try {
      await dispatch(createTeam({ team: formData })).unwrap();
      toast.success('Team created successfully!');
      setIsCreateModalOpen(false);
      dispatch(resetTeams());
    } catch (error) {
      toast.error(error.message || 'Failed to create team');
    }
  };
  
  const handleUpdateTeam = async (e, formData) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
  
    try {
      await dispatch(updateTeam({ 
        teamId: teamToEdit._id, 
        updates: formData
      })).unwrap();
      toast.success('Team updated successfully!');
      setIsEditModalOpen(false);
      setTeamToEdit(null);
    } catch (error) {
      toast.error(error.message || 'Failed to update team');
    }
  };

  const handleDeleteTeam = async () => {
    try {
      await dispatch(deleteTeam({ teamId: teamToDelete._id })).unwrap();
      toast.success('Team deleted successfully!');
      setIsDeleteModalOpen(false);
      setTeamToDelete(null);
      if (selectedTeam?._id === teamToDelete._id) {
        setSelectedTeam(null);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete team');
    }
  };

  const openEditModal = (team) => {
    setTeamToEdit(team);
    setNewTeam({
      name: team.teamName,
      description: team.description,
      teamLead: team.teamLead,
      department: team.department
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (team) => {
    setTeamToDelete(team);
    setIsDeleteModalOpen(true);
  };

  if (status === 'loading' && !hasFetched) {
    return <LoadingPage />;
  }

  return (
    <div className="bg-gradient-to-br from-base-300 to-base-200 min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Team Management</h1>
            <p className="text-gray-300">Manage your teams and view their members</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              icon={<FiPlus className="w-4 h-4" />}
              variant="primary"
            >
              Create New Team
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TeamList
            teams={teams}
            selectedTeam={selectedTeam}
            onSelectTeam={setSelectedTeam}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
          
          <TeamDetails
            team={selectedTeam}
            onClose={() => setSelectedTeam(null)}
          />
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Team"
      >
        <TeamForm
          team={newTeam}
          errors={errors}
          users={employees}
          departments={departments}
          onSubmit={handleCreateTeam}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit ${teamToEdit?.name}`}
      >
        <TeamForm
          team={teamToEdit}
          departments={departments}
          users={employees}
          errors={errors}
          onSubmit={handleUpdateTeam}
          onCancel={() => setIsEditModalOpen(false)}
          isEditing
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Are you sure you want to delete the team <span className="font-semibold">"{teamToDelete?.name}"</span>? This action cannot be undone.
          </p>
          
          <div className="mt-6 flex justify-end gap-3">
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteTeam}
              variant="danger"
              icon={<FiTrash2 className="w-4 h-4" />}
            >
              Delete Team
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeamManagementPage;