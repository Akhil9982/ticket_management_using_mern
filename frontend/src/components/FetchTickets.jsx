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
        const response = await axios.get(`${BASE_URL}/api/tickets/getTickets`, {
          withCredentials: true,
        });
        if (isMounted) {
          const ticketData = response.data?.tickets || response.data || [];
          setTickets(ticketData);
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
                assignedTo:
                  response.data?.ticket?.assignedTo ??
                  response.data?.assignedTo ??
                  {
                    _id: user._id || user.id,
                    name: user.name,
                  },
                status: response.data?.ticket?.status ?? "Assigned",
              }
            : ticket,
        ),
      );
    } catch (error) {
      console.error("Assign failed", error.response?.data || error);
    }
  };

  return (
    <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-5 border-b bg-slate-50">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Ticket Queue</h2>

          <p className="text-sm text-slate-500 mt-1">
            Monitor, assign, and manage support tickets.
          </p>
        </div>

        <div className="rounded-2xl bg-indigo-50 px-4 py-2 text-indigo-700 font-semibold">
          {tickets.length} Tickets
        </div>
      </div>

      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Ticket</StyledTableCell>
              <StyledTableCell>Reported By</StyledTableCell>
              <StyledTableCell>Priority</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Assigned To</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tickets.map((ticket) => (
              <StyledTableRow key={ticket._id}>
                <StyledTableCell>
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-900">
                      {ticket.title}
                    </div>

                    <div className="text-xs text-slate-400">
                      #{ticket._id?.slice(-6) || "N/A"}
                    </div>
                  </div>
                </StyledTableCell>

                <StyledTableCell>
                  <div className="font-medium">
                    {ticket.createdBy?.name ||
                      ticket.createdBy?.username ||
                      ticket.reporter?.name ||
                      ticket.user?.name ||
                      "Unknown"}
                  </div>
                </StyledTableCell>

                <StyledTableCell>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm 
                      ${
                        ticket.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : ticket.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      }`}
                  >
                    {ticket.priority}
                  </span>
                </StyledTableCell>

                <StyledTableCell>
                  <span className="inline-flex rounded-full px-3 py-1 bg-indigo-100 text-indigo-700">
                    {ticket.status}
                  </span>
                </StyledTableCell>

                <StyledTableCell>
                  <div className="font-medium text-slate-700">
                    {ticket.assignedTo?.name ||
                      ticket.assignedTo?.username ||
                      ticket.assignedAgent?.name ||
                      "Unassigned"}
                  </div>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Buttons
                    ticketId={ticket._id}
                    assignedTo={ticket.assignedTo}
                    onAssign={(user) => updateAssignedAgent(ticket._id, user)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FetchTickets;
