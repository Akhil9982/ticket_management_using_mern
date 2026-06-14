import axios from "axios";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import MyAccount from "./pages/MyAccount";
import ViewTicket from "./pages/ViewTicket";
import EditTicket from "./pages/EditTicket";
import DeleteTicket from "./pages/DeleteTicket";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/CreateTicket" element={<CreateTicket />} />
      <Route path="/MyAccount" element={<MyAccount />} />
      <Route path="/ViewTicket/:id" element={<ViewTicket />} />
      <Route path="/EditTicket/:id" element={<EditTicket />} />
      <Route path="/DeleteTicket/:id" element={<DeleteTicket />} />
    </Routes>
  );
};

export default App;
