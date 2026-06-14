import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";

const Buttons = ({ onAssign, assignedTo, ticketId }) => {
  const navigate = useNavigate();
  const user = useMemo(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }, []);

  const permissions = {
    customer: ["view"],
    agent: ["view", "assign"],
    admin: ["view", "assign", "edit", "delete"],
  };

  const rolePermissions = permissions[user?.role] || [];

  const handleAssign = () => {
    if (!user || !onAssign) return;

    onAssign(user);
  };

  const handleView = () => {
    navigate(`/ViewTicket/${ticketId}`);
  };

  const handleEdit = () => {
    navigate(`/EditTicket/${ticketId}`);
  };

  const handleDeleteBtn = () => {
    navigate(`/DeleteTicket/${ticketId}`);
  };

  return (
    <Box sx={{ "& button": { m: 1 } }}>
      <div>
        {rolePermissions.includes("view") && (
          <Button variant="outlined" size="small" onClick={handleView}>
            View
          </Button>
        )}

        {rolePermissions.includes("assign") && !assignedTo && (
          <Button variant="outlined" size="small" onClick={handleAssign}>
            Assign
          </Button>
        )}

        {rolePermissions.includes("edit") && (
          <Button variant="contained" size="small" onClick={handleEdit}>
            Edit
          </Button>
        )}
        {rolePermissions.includes("delete") && (
          <Button variant="contained" size="small" onClick={handleDeleteBtn}>
            Delete
          </Button>
        )}
      </div>
    </Box>
  );
};

const CreateTicketBtn = () => {
  return (
    <Box sx={{ "& button": { m: 1 } }}>
      <div>
        <Link to="/CreateTicket">
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            size="small"
          >
            Create Ticket
          </Button>
        </Link>
      </div>
    </Box>
  );
};

export { CreateTicketBtn, Buttons };
