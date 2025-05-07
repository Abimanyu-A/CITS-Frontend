import Button from "../element/Button";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const TeamActions = ({ team, onEdit, onDelete }) => {
  return (
    <div className="flex gap-2 justify-end">
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onEdit(team);
        }}
        icon={<FiEdit2 className="w-3 h-3" />}
        variant="secondary"
        size="sm"
      >
        Edit
      </Button>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(team);
        }}
        icon={<FiTrash2 className="w-3 h-3" />}
        variant="danger"
        size="sm"
      >
        Delete
      </Button>
    </div>
  );
};

export default TeamActions;