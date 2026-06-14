import { useState } from "react";
import {
  RiCopyrightLine,
  RiDashboardLine,
  RiGithubFill,
  RiHeartFill,
  RiLinkedinFill,
  RiLinksLine,
  RiMenuLine,
  RiReactjsLine,
  RiTicketFill,
} from "@remixicon/react";
import Button from "@mui/material/Button";
import HeroImg from "../assets/Illustration.png";
import CreateImg from "../assets/create.svg?react";
import AssignImg from "../assets/assign.svg?react";
import DoneImg from "../assets/done.svg?react";
import { Link } from "react-router-dom";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="p-5 flex justify-between items-center bg-blue-100 relative">
        <div className="left flex items-center space-x-1">
          <RiTicketFill size={32} className="text-indigo-500 rotate-130" />
          <h1 className="font-bold">TixHub</h1>
        </div>

        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <RiMenuLine size={28} />
        </button>

        <div className="hidden md:flex gap-5 items-center">
          <Link>Features</Link>
          <Link to="/">Pricing</Link>
          <Link to="/">Documentation</Link>
          <Link to="/">Demo</Link>
          <Link to="Login">
            <Button variant="outlined" sx={{ textTransform: "none" }}>
              Login / Sign Up
            </Button>
          </Link>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-indigo-200 shadow-md flex flex-col gap-4 p-5 md:hidden z-50">
            <Link>Features</Link>
            <Link to="/">Pricing</Link>
            <Link to="/">Documentation</Link>
            <Link to="/">Demo</Link>
            <Link to="Login">
              <Button variant="outlined" sx={{ textTransform: "none" }}>
                Login / Sign Up
              </Button>
            </Link>
          </div>
        )}
      </nav>
      <header className="flex flex-col md:flex-row bg-blue-100 items-center justify-between p-5 gap-8">
        <div className="left-section order-1 md:order-1 text-center md:text-left">
          <div className="heading text-3xl md:text-5xl font-bold">
            <h2>Streamline Your</h2>
            <h2>Support with TixHub</h2>
          </div>
          <div className="text-wrap p-2 max-w-xl">
            <p>
              The powerful, open-source Ticket Management System build on the
              MERN Stack. Efficiently track,manage,and resolve customer requests
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 p-2 justify-center md:justify-start">
            <Button variant="contained" sx={{ textTransform: "none" }} href="#">
              Get Started Free
            </Button>
            <Button variant="outlined" sx={{ textTransform: "none" }} href="#">
              Request a Demo
            </Button>
          </div>
        </div>
        <div className="right-section order-2 md:order-2 flex justify-center">
          <img
            src={HeroImg}
            alt="Illustration"
            className="w-full max-w-[320px] md:max-w-150 h-auto"
          />
        </div>
      </header>
      <main>
        <section className="p-5 flex flex-col md:flex-row justify-between gap-4">
          <div className="mid-cards-1 bg-indigo-100 flex flex-col sm:flex-row justify-center items-center border-indigo-500 border-2 gap-3 rounded-2xl p-4 w-full md:w-1/3 text-center sm:text-left">
            <div className="block p-2.5 bg-indigo-300 rounded-full">
              <RiDashboardLine color="darkblue" size={36} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Unified Dashboard</h2>
              <span className="text-sm">
                Centralized ticket view, prioritizing tickets.
              </span>
            </div>
          </div>
          <div className="mid-cards-2 bg-indigo-100 flex flex-col sm:flex-row justify-center items-center border-indigo-500 border-2 gap-3 rounded-2xl p-4 w-full md:w-1/3 text-center sm:text-left">
            <div className="block p-2.5 bg-indigo-300 rounded-full">
              <RiLinksLine color="darkblue" size={36} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Robust Workflow</h2>
              <span className="text-sm">Track your ticket status.</span>
            </div>
          </div>
          <div className="mid-cards-3 bg-indigo-100 flex flex-col sm:flex-row justify-center items-center border-indigo-500 border-2 gap-3 rounded-2xl p-4 w-full md:w-1/3 text-center sm:text-left">
            <div className="block p-2.5 bg-indigo-300 rounded-full">
              <RiReactjsLine color="darkblue" size={36} />
            </div>
            <div>
              <h2 className="text-xl font-bold">MERN Powered</h2>
              <span className="text-sm">
                Scalable,secure,high-performance web app.
              </span>
            </div>
          </div>
        </section>
        <section className="p-5">
          <div>
            <h2 className="font-bold text-2xl pb-2">How It Works</h2>
          </div>
          <div className="cards-container flex flex-col md:flex-row gap-8 p-5 justify-evenly items-center">
            <div className="bottom-card-1 flex flex-col sm:flex-row gap-4 items-center text-center sm:text-left">
              <div className="w-25 h-25">
                <CreateImg className="w-full h-full text-center bg-indigo-100 rounded-full p-1" />
              </div>
              <div>
                <h2 className="font-bold">1. Create</h2>
                <p className="text-sm">Submit tickets easily.</p>
              </div>
            </div>
            <div className="bottom-card-2 flex flex-col sm:flex-row gap-4 items-center text-center sm:text-left">
              <div className="w-25 h-25">
                <AssignImg className="w-full h-full text-center bg-indigo-100 rounded-full p-1" />
              </div>
              <div>
                <h2 className="font-bold">2. Assign</h2>
                <p className="text-sm">Track and manage progress.</p>
              </div>
            </div>
            <div className="bottom-card-3 flex flex-col sm:flex-row gap-4 items-center text-center sm:text-left">
              <div className="w-25 h-25">
                <DoneImg className="w-full h-full text-center bg-indigo-100 rounded-full p-1" />
              </div>
              <div>
                <h2 className="font-bold">3. Resolve</h2>
                <p className="text-sm">Close tickets efficiently.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="flex justify-center">
          <hr className="border-0 h-0.5 w-1/2 align-center bg-indigo-500 my-8" />
        </div>
        <div className="flex flex-col md:flex-row gap-6 justify-evenly items-center px-5 pb-5 text-center">
          <div className="social flex items-center gap-5 justify-center">
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <RiLinkedinFill color="darkblue" />
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <RiGithubFill color="darkblue" />
            </a>
          </div>
          <div className="flex gap-2 justify-evenly items-center">
            Designed by
            <a
              href="https://akhil9982.github.io/Portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500"
            >
              Akhil Batulla
            </a>
            With <RiHeartFill color="red" />
          </div>
          <div className="copy-right-section flex justify-evenly gap-2.5 items-center">
            <RiCopyrightLine size={16} />
            <span>2026 TixHub. All Rights Reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
