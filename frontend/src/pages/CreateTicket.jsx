import axios from "axios";
import { useState } from "react";

const CreateTicket = () => {
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
        `${BASE_URL}/api/tickets/create`,
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
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6">
      {isCustomer && (
        <>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-w-lg border p-2 bg-gray-600 rounded-2xl"
          >
            <h2 className="text-white">
              Enter the details for Ticket
            </h2>

            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 text-white rounded"
            />

            <textarea
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded text-white"
            />

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="border text-white p-2 rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <button
              type="submit"
              className="bg-indigo-600 text-white rounded p-2"
            >
              Create Ticket
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateTicket;
