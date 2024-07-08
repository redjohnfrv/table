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

const data = [
  { id: 5, name: "Item 1", count: 5, date: "2022-01-01" },
  { id: 66, name: "Item 2", count: 10, date: "2022-02-01" },
  { id: 123, name: "Item 3", count: 8, date: "2022-03-01" },
];

export const Table = () => {
  const [selectedIds, setSelectedIds] = useState([]);

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

  console.log(selectedIds);

  return (
    <div>
      <Toolbar>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log(1)}
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
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  onChange={(event) => handleCheckboxChange(event, item.id)}
                />
                {item.name}
              </TableCell>
              <TableCell>{item.count}</TableCell>
              <TableCell>{item.date}</TableCell>
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
    </div>
  );
};
