import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

type CreateEditModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

export const CreateEditModal = ({ onClose, isOpen }: CreateEditModalProps) => {
  const handleSubmit = () => {
    // Handle form submission here
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField label="Name" />
          <TextField label="Email" />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};
