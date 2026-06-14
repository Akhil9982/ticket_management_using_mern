import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";

const ViewTicket = () => {
  const { id } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [ticket, setTicket] = useState(null);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  useEffect(() => {
    const getTicket = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/tickets/${id}`, {
          withCredentials: true,
        });

        setTicket(response.data);
      } catch (error) {
        console.error("Ticket fetch failed", error.response?.data || error);
      }
    };

    getTicket();
  }, [BASE_URL, id]);

  const addComment = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/tickets/${id}/comments/addComments`,
        {
          comment,
        },
        {
          withCredentials: true,
        },
      );

      setTicket((prev) => ({
        ...prev,
        comments: response.data.comments,
      }));

      setComment("");
    } catch (error) {
      console.error("Comment failed", error.response?.data || error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <section className="p-6 flex justify-end">
        <Link to="/Dashboard">
          <Button variant="contained" sx={{ textTransform: "none" }}>
            Dashboard
          </Button>
        </Link>
      </section>
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="bg-linear-to-r from-indigo-700 to-violet-700 text-white p-8">
            <div className="flex flex-col gap-3">
              <div className="text-sm uppercase tracking-widest opacity-80">
                Ticket Details
              </div>

              <h1 className="text-4xl font-bold">
                {ticket?.title || "Loading Ticket..."}
              </h1>

              <div className="flex flex-wrap gap-3 text-sm">
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  #{ticket?._id}
                </span>

                <span className="bg-white/20 px-3 py-1 rounded-full">
                  {ticket?.status || "Unknown"}
                </span>

                <span className="bg-white/20 px-3 py-1 rounded-full">
                  {ticket?.priority || "Normal"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[2fr_1fr] gap-6 p-6">
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-2xl p-6">
                <h2 className="font-semibold text-lg mb-4">Description</h2>

                <p className="text-slate-700 leading-7 whitespace-pre-wrap">
                  {ticket?.description || "No description available"}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-lg">Discussion</h2>
                </div>

                <div className="space-y-3 max-h-105 overflow-y-auto">
                  {ticket?.comments?.length ? (
                    ticket.comments.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-2xl border p-4"
                      >
                        <div className="font-semibold text-indigo-700 mb-1">
                          {item.user?.name || "User"}
                        </div>

                        <div className="text-slate-700">{item.comment}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-500">No comments yet</div>
                  )}
                </div>
                {role === "customer" ? (
                  <div className="text-slate-400 mt-5">
                    Comments are disabled for customers
                  </div>
                ) : (
                  <div className="mt-5 space-y-3">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      className="w-full rounded-2xl border p-4 outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Write a comment..."
                    />

                    <button
                      className="rounded-2xl px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                      onClick={addComment}
                    >
                      Send Comment
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="bg-slate-50 rounded-2xl p-6 sticky top-6">
                <h2 className="font-semibold text-lg mb-5">Ticket Info</h2>

                <div className="space-y-5">
                  <div>
                    <div className="text-xs uppercase text-slate-400">
                      Reported By
                    </div>
                    <div className="font-medium">
                      {ticket?.createdBy?.name || "Unknown"}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase text-slate-400">
                      Assigned To
                    </div>
                    <div className="font-medium">
                      {ticket?.assignedTo?.name || "Unassigned"}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase text-slate-400">
                      Status
                    </div>
                    <div className="font-medium">{ticket?.status}</div>
                  </div>

                  <div>
                    <div className="text-xs uppercase text-slate-400">
                      Priority
                    </div>
                    <div className="font-medium">{ticket?.priority}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTicket;
