import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const CreateTicket = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const isCustomer = user?.role === "customer";
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/api/tickets/createTicket`,
        formData,
        {
          withCredentials: true,
        },
      );

      console.log(response.data);
      alert("Ticket created successfully");

      setFormData({
        title: "",
        description: "",
        priority: "low",
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="p-6 flex justify-end">
        <Link to="/dashboard">
          <Button variant="contained" sx={{ textTransform: "none" }}>
            Dashboard
          </Button>
        </Link>
      </section>
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        {isCustomer && (
          <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl bg-white grid lg:grid-cols-2">
            <div className="bg-linear-to-br from-indigo-700 via-violet-700 to-fuchsia-700 text-white p-10 flex flex-col justify-center">
              <div className="uppercase tracking-[0.3em] text-sm opacity-80">
                Ticket Management
              </div>

              <h1 className="text-5xl font-bold mt-4 leading-tight">
                Create a support ticket
              </h1>

              <p className="mt-6 text-indigo-100 leading-7">
                Describe the issue clearly so the support team can assign,
                track, and resolve it faster.
              </p>

              <div className="mt-10 space-y-4 text-sm">
                <div>✓ Clear title</div>
                <div>✓ Detailed description</div>
                <div>✓ Set ticket priority</div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-10 flex flex-col justify-center gap-6"
            >
              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  New Ticket
                </h2>
                <p className="text-slate-500 mt-2">
                  Fill in the details below.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Login issue, payment issue..."
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Description
                </label>
                <textarea
                  rows={6}
                  name="description"
                  placeholder="Explain the issue in detail"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white py-4 font-semibold transition"
              >
                Create Ticket
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTicket;
