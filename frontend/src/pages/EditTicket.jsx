import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "./Navbar";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
  });

  useEffect(() => {
    const getTicket = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/tickets/${id}`, {
          withCredentials: true,
        });

        const ticket = response.data?.ticket || response.data;

        setFormData({
          title: ticket?.title || "",
          description: ticket?.description || "",
          priority: ticket?.priority
            ? ticket.priority.charAt(0).toUpperCase() +
              ticket.priority.slice(1).toLowerCase()
            : "Medium",
          status: ticket?.status || "Open",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      getTicket();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateTicket = async () => {
    try {
      setSaving(true);

      await axios.put(`${BASE_URL}/api/tickets/${id}`, formData, {
        withCredentials: true,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        Loading ticket...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-white">
      <Navbar />

      <Box className="flex justify-center px-5 py-10">
        <Card
          sx={{
            width: "100%",
            maxWidth: 850,
            borderRadius: 6,
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Typography variant="h4" fontWeight={700} mb={1}>
              Edit Ticket
            </Typography>

            <Typography color="text.secondary" mb={5}>
              Update ticket details and save changes.
            </Typography>

            <div className="grid gap-6 mt-4">
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                minRows={6}
                fullWidth
              />

              <div className="grid md:grid-cols-2 gap-5">
                <TextField
                  select
                  label="Priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </TextField>

                <TextField
                  select
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="Assigned">Assigned</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                </TextField>
              </div>

              <div className="flex gap-3 justify-end mt-4">
                <Button
                  variant="outlined"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  disabled={saving}
                  onClick={updateTicket}
                  sx={{ textTransform: "none" }}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default EditTicket;
