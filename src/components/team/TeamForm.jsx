import { useState } from "react";
import TextInput from "../form/TextInput";
import Button from "../element/Button";
import { FiPlus, FiSave, FiTrendingUp, FiUser, FiUsers } from "react-icons/fi";
import SelectInput from "../form/SelectInput";

const TeamForm = ({
  team = { 
    teamName: '', 
    description: '',
    teamLead: '',  // Will store user ID of the team lead
    department: ''
  },
  departments = [],
  users = [],      // Array of all users to select team lead from
  errors = {},
  onSubmit,
  onCancel,
  isEditing = false
}) => {
  const [formData, setFormData] = useState(team);
  console.log(formData)

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e,formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <TextInput
          label="Team Name"
          name="name"
          value={formData.teamName}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          required
          icon={<FiUsers className="text-gray-400" />}
        />
        
        <TextInput
          label="Description"
          name="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          error={errors.description}
          textarea
          rows={3}
        />

        <SelectInput
          label="Team Lead"
          name="teamLead"
          value={formData.teamLead}
          onChange={(e) => handleChange('teamLead', e.target.value)}
          options={users.map(user => ({
            value: user._id,
            label: `${user.firstName} ${user.lastName}`
          }))}
          error={errors.teamLead}
          required
          icon={<FiUser className="text-gray-400" />}
        />

        <SelectInput
          label="Department"
          name="department"
          value={formData.department}
          onChange={(e) => handleChange('department', e.target.value)}
          options={departments.map(dept => ({value: dept._id, label: dept.DeptName}))}
          error={errors.department}
          required
          icon={<FiTrendingUp className="text-gray-400" />}
        />
      </div>
      
      <div className="mt-6 flex justify-end gap-3">
        <Button
          type="button"
          onClick={onCancel}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          icon={isEditing ? <FiSave className="w-4 h-4" /> : <FiPlus className="w-4 h-4" />}
        >
          {isEditing ? 'Save Changes' : 'Create Team'}
        </Button>
      </div>
    </form>
  );
};

export default TeamForm;