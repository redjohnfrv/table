import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Toolbar,
} from "@material-ui/core";
import { useState } from "react";
import { useGetUsers } from "../../hooks/useGetUsers.ts";
import { CreateEditModal } from "../create-edit-modal/create-edit-modal.tsx";

export const Table = () => {
  const users = useGetUsers();
  const [selectedIds, setSelectedIds] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (event, itemId) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, itemId]);
    } else {
      setSelectedIds(selectedIds.filter((id) => id !== itemId));
    }
  };

  const handleClick = (item: any) => {
    console.log(item);
  };

  return (
    <div>
      <Toolbar>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsOpen(true)}
        >
          Button 1
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log(2)}
        >
          Button 2
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log(3)}
        >
          Button 3
        </Button>
      </Toolbar>

      <MUITable>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>DateAt</TableCell>
            <TableCell>DateUntil</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  onChange={(event) => handleCheckboxChange(event, item.id)}
                />
                {item.name}
              </TableCell>
              <TableCell>{item.count}</TableCell>
              <TableCell>{item.dateAt}</TableCell>
              <TableCell>{item.dateUntil}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleClick(item)}
                  variant="contained"
                  color="primary"
                >
                  Action 1
                </Button>
                <Button
                  onClick={() => handleClick(item)}
                  variant="contained"
                  color="secondary"
                >
                  Action 2
                </Button>
                <Button
                  onClick={() => handleClick(item)}
                  variant="contained"
                  color="default"
                >
                  Action 3
                </Button>
                <Button
                  onClick={() => handleClick(item)}
                  variant="contained"
                  color="default"
                >
                  Action 4
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MUITable>

      <CreateEditModal onClose={() => setIsOpen(false)} isOpen={isOpen} />
    </div>
  );
};
