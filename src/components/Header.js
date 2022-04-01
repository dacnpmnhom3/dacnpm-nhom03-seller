import "./Header.css";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={3}
      bg="primary.main"
    >
      <Link to="/">
        <img
          src="https://salt.tikicdn.com/ts/sc/32/79/ed/dc30d6234368c84a5aeb3008740de72f.png"
          alt="logo"
          className="logo-right logo"
        />
      </Link>

      <img
        src="https://cdn-icons-png.flaticon.com/512/5968/5968520.png"
        alt="logo"
        className="logo"
      />
    </Box>
  );
}

export default Header;
