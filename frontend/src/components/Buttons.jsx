import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Buttons = () => {
  return (
    <Box sx={{ "& button": { m: 1 } }}>
      <div>
        <Button variant="outlined" size="small">
          View
        </Button>
        <Button variant="outlined" size="small">
          Assign
        </Button>
        <Button variant="outlined" size="small">
          Edit
        </Button>
      </div>
    </Box>
  );
};

export default Buttons;
