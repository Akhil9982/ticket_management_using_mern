import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import Profilemenu from "../components/ProfileMenu";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <nav className="flex gap-2 p-2">
        <div className="logo text-indigo-500 rotate-120 text-2xl">
          <Link to="/" rel="noopener noreferrer">
            <ConfirmationNumberIcon />
          </Link>
        </div>
        <div className="flex justify-end w-full">
          <div className="scale-125 origin-right">
            <Profilemenu />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
