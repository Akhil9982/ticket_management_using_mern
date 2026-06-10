import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import Profilemenu from "../components/ProfileMenu";
const Navbar = () => {
  return (
    <div>
      <nav className="flex gap-2 p-2">
        <div className="logo text-blue-500">
          <a href="http://" rel="noopener noreferrer">
            <ConfirmationNumberIcon />
          </a>
        </div>
        <div className="flex justify-between  w-full">
          <input
            className="w-100 h-8 border px-2 bg-gray-200 rounded-2xl"
            placeholder="Search..."
            type="search"
            name="search"
            id="search"
          />
          <Profilemenu />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
