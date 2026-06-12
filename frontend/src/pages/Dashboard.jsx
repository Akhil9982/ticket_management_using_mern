import FetchTickets from "../components/Tickets";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div>
        <h1 className="text-2xl p-2 font-bold">Active Tickets</h1>
        <FetchTickets />
      </div>
    </div>
  );
};

export default Dashboard;
