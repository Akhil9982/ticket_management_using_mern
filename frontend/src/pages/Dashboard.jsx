import FetchTickets from "../components/FetchTickets";
import Navbar from "./Navbar";
import { CreateTicketBtn } from "../components/Buttons";
import { useMemo } from "react";

const Dashboard = () => {
  const user = useMemo(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }, []);

  const isCustomer = user?.role === "customer";

  return (
    <div>
      <Navbar />
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl p-2 font-bold">Active Tickets</h1>
          {isCustomer && <CreateTicketBtn />}
        </div>
        <FetchTickets />
      </div>
    </div>
  );
};

export default Dashboard;
