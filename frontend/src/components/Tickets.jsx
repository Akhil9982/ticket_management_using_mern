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

import Buttons from "./Buttons";

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

const CustomizedTables = () => {
  const [tickets, setTickets] = useState([]);

  const getTickets = async () => {
    try {
    const currentToken = localStorage.getItem('token'); 
    
    if (!currentToken || currentToken === 'null') {
      console.warn("Skipping API call: Token is not available yet.");
      return;
    }

    const response = await axios.get('http://localhost:3000/api/tickets/getTickets', {
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    });
    console.log("Tickets fetched successfully:", response.data);

    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  const updateAssignedAgent = (ticketId, assignedAgent) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket._id === ticketId
          ? {
              ...ticket,
              assignedTo: assignedAgent,
            }
          : ticket,
      ),
    );
  };

  return (
    <TableContainer component={Paper}>
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
                  ticketId={ticket._id}
                  assignedTo={ticket.assignedTo}
                  updateAssignedAgent={updateAssignedAgent}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomizedTables;
