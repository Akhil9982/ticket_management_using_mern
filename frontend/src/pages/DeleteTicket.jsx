import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const DeleteTicket = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ FIX: move here

  if (role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/tickets/${id}`, {
        withCredentials: true,
      });

      alert("Ticket deleted successfully");

      navigate("/Dashboard");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Delete Ticket
        </h2>

        <p className="text-gray-600 mb-4">
          You are about to delete ticket: <b>{id}</b>
        </p>

        <button
          onClick={handleDelete}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium"
        >
          Delete Ticket
        </button>
      </div>
    </div>
  );
};

export default DeleteTicket;