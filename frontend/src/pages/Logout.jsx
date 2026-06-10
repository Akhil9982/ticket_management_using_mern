import axios from "axios";
import {navigate} from "react-router-dom"

const Logout = () => {
  const handleLogout = async () => {
    try {
      // 1. Optional: Call the backend logout route if you want to log it
      await axios.post("http://localhost:3000/api/auth/logout");
    } catch (error) {
      console.error("Backend logout log failed:", error);
    } finally {
      // 2. CRITICAL: Clear the token and user data from Local Storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // 3. Redirect the user back to the Sign-In page
      navigate("/login");
    }
  };
  return <div>Logout</div>;
};

export default Logout;
