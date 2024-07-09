import { Button, Toolbar } from "@material-ui/core";

type ActionToolbarProps = {
  open: () => void;
  isCreating: boolean;
};

export const ActionToolbar = ({ open, isCreating }: ActionToolbarProps) => {
  return (
    <Toolbar>
      <Button
        disabled={isCreating}
        variant="contained"
        color="primary"
        onClick={open}
      >
        Создать
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => console.log(2)}
      >
        Button 2
      </Button>
    </Toolbar>
  );
};
