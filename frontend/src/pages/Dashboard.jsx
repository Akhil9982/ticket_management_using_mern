import CustomizedTables from "../components/Tickets";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div>
        <h1 className="text-2xl font-bold">Active Tickets</h1>
        <CustomizedTables />
      </div>
    </div>
  );
};

export default Dashboard;
