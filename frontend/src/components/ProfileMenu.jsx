import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { RiLogoutBoxLine, RiUserLine } from "@remixicon/react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profilemenu = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMyAccount = () => {
    handleClose();
    navigate("/MyAccount");
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/api/auth/logout`);
    } catch (error) {
      console.error("Backend logout log failed:", error);
    } finally {
      // 2. CRITICAL: Clear the token and user data from Local Storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      handleClose();
      // 3. Redirect the user back to the Sign-In page
      navigate("/login");
    }
  };

  return (
    <Box>
      <div>
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          sx={{
            border: "1px solid #e2e8f0",
            borderRadius: "999px",
            px: 0.6,
            py: 0.3,
            background: "white",
            transition: "0.2s",
            "&:hover": {
              background: "#eef2ff",
              transform: "translateY(-1px)",
            },
          }}
        >
          <AccountCircle
            sx={{
              color: "#4f46e5",
              fontSize: 30,
            }}
          />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            sx: {
              width: 280,
              mt: 1,
              borderRadius: 4,
              overflow: "hidden",
              boxShadow:
                "0 20px 60px rgba(15,23,42,0.12)",
            },
          }}
        >
          <Box sx={{ p: 2.5 }}>
            <Box display="flex" gap={2} alignItems="center">
              <Avatar
                sx={{
                  bgcolor: "#4f46e5",
                  width: 54,
                  height: 54,
                  fontWeight: 700,
                }}
              >
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </Avatar>

              <Box>
                <Typography fontWeight={700}>
                  {user?.name || "User"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email || "No email"}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider />

          <MenuItem
            onClick={handleMyAccount}
            sx={{ gap: 1.5, py: 1.8 }}
          >
            <RiUserLine size={18} />
            My Account
          </MenuItem>

          <MenuItem
            onClick={handleLogout}
            sx={{
              gap: 1.5,
              py: 1.8,
              color: "#dc2626",
            }}
          >
            <RiLogoutBoxLine size={18} />
            Log out
          </MenuItem>
        </Menu>
      </div>
    </Box>
  );
};

export default Profilemenu;
