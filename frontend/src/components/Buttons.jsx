import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const Buttons = () => {
  const user = useMemo(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }, []);

  const permissions = {
    customer: ["view"],
    agent: ["view", "assign"],
    admin: ["view", "assign", "edit"],
  };

  const rolePermissions = permissions[user?.role] || [];

  return (
    <Box sx={{ "& button": { m: 1 } }}>
      <div>
        {rolePermissions.includes("view") && (
          <Button variant="outlined" size="small">
            View
          </Button>
        )}

        {rolePermissions.includes("assign") && (
          <Button variant="outlined" size="small">
            Assign
          </Button>
        )}

        {rolePermissions.includes("edit") && (
          <Button variant="outlined" size="small">
            Edit
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
          <Button variant="outlined" size="small">
            Create Ticket
          </Button>
        </Link>
      </div>
    </Box>
  );
};

export { CreateTicketBtn, Buttons };
