import { RiMailFill, RiUser3Fill, RiShieldUserFill } from "@remixicon/react";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const MyAccount = () => {
  const user = useMemo(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }, []);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "NA";

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-white">
      <Navbar />

      <div className="flex justify-center px-5 py-10">
        <section className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          <div className="bg-linear-to-r from-indigo-600 to-violet-600 h-36" />

          <div className="px-8 pb-8 -mt-16">
            <div className="flex flex-col items-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-3xl font-bold text-white shadow-lg">
                {initials}
              </div>

              <h1 className="mt-5 text-3xl font-bold text-slate-900">
                {user?.name || "No Name"}
              </h1>

              <span className="mt-2 rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
                {user?.role || "No Role"}
              </span>
            </div>

            <div className="mt-8 grid gap-4">
              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center gap-3">
                  <RiMailFill className="text-indigo-600" />
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="font-medium text-slate-800">
                      {user?.email || "No Email"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <RiUser3Fill className="text-indigo-600" />
                    <div>
                      <p className="text-xs text-slate-500">User Name</p>
                      <p className="font-medium">
                        {user?.name || "Unavailable"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <RiShieldUserFill className="text-indigo-600" />
                    <div>
                      <p className="text-xs text-slate-500">Role</p>
                      <p className="font-medium capitalize">
                        {user?.role || "Unavailable"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Link to="/Dashboard">
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    borderRadius: "999px",
                    paddingInline: "24px",
                    paddingBlock: "10px",
                  }}
                >
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyAccount;
