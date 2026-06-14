import { RiMailFill} from "@remixicon/react";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useMemo } from "react";
const MyAccount = () => {
  const user = useMemo(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }, []);
  return (
    <div>
      <Navbar />
      <div className="p-5">
        <section className="p-3 border border-indigo-500 w-1/2">
          <h1 className="font-bold">{user?.name || "No Name"}</h1>
          <span className="text-xs text-gray-500">{user?.role || "No Role"}</span>
          <div className="details">
            <div className="flex items-center gap-1">
              <RiMailFill size={16} />
              <div className="text-gray-500">{user?.email || "No Email"}</div>
            </div>
          </div>
        </section>
        <section className="mt-2">
          <Link to="/Dashboard">
            <Button variant="contained" sx={{ textTransform: "none" }}>
              Dashboard
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default MyAccount;
