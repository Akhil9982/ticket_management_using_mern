import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Buttons } from "./Buttons";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));
const BASE_URL = import.meta.env.VITE_BASE_URL;
const FetchTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const getTickets = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/tickets/getTickets`);
        if (isMounted) {
          setTickets(response.data);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    getTickets();
    return () => {
      isMounted = false;
    };
  }, []);

  const updateAssignedAgent = async (ticketId, user) => {
    try {
      if (user?.role !== "agent") return;

      const response = await axios.put(
        `${BASE_URL}/api/tickets/${ticketId}`,
        {
          assignedTo: user._id || user.id,
          status: "Assigned",
        },
        {
          withCredentials: true,
        },
      );

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === ticketId
            ? {
                ...ticket,
                assignedTo: response.data?.assignedTo || { name: user.name },
                status: response.data?.status || "Assigned",
              }
            : ticket,
        ),
      );
    } catch (error) {
      console.error("Assign failed", error.response?.data || error);
    }
  };

  return (
    <TableContainer className="p-2" component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Ticket ID</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Reporter</StyledTableCell>
            <StyledTableCell>Priority</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Assigned To</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tickets.map((ticket) => (
            <StyledTableRow key={ticket._id}>
              <StyledTableCell>{ticket._id.slice(-6)}</StyledTableCell>

              <StyledTableCell>{ticket.title}</StyledTableCell>

              <StyledTableCell>{ticket.createdBy?.name}</StyledTableCell>

              <StyledTableCell>{ticket.priority}</StyledTableCell>

              <StyledTableCell>{ticket.status}</StyledTableCell>

              <StyledTableCell>
                {ticket.assignedTo?.name || "Unassigned"}
              </StyledTableCell>

              <StyledTableCell align="center">
                <Buttons
                  assignedTo={ticket.assignedTo}
                  onAssign={(user) => updateAssignedAgent(ticket._id, user)}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FetchTickets;
