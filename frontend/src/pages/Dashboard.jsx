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
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="rounded-3xl overflow-hidden bg-linear-to-r from-indigo-700 via-violet-700 to-fuchsia-700 text-white shadow-xl">
          <div className="p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>
              <div className="uppercase tracking-[0.25em] text-xs opacity-80">
                Ticket Dashboard
              </div>

              <h1 className="text-4xl font-bold mt-3">
                Active Tickets
              </h1>

              <p className="mt-3 text-indigo-100 max-w-2xl leading-7">
                Track ticket progress, manage assignments, and keep conversations moving.
              </p>
            </div>

            {isCustomer && (
              <div className="bg-white/10 backdrop-blur rounded-2xl p-2 self-start lg:self-center">
                <CreateTicketBtn />
              </div>
            )}

          </div>
        </div>

        <div className="mt-8 bg-white rounded-3xl shadow-md p-4 lg:p-6">
          <FetchTickets />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
