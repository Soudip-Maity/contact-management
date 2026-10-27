import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSearch } from "../redux_services/filterSlice";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CsvExport from "./CsvExport";
import Addcontact from "./addcontact";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter.value);
  const search = useSelector((state) => state.filter.search);
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.clear();
    navigate("/login");
  };
 
return (
  <Box sx={{ flexGrow: 0 }}>
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        color: "#172033",
        borderBottom: "1px solid #e5eaf2",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "76px !important",
          px: { xs: 2, md: 4 },
          gap: 2,
          flexWrap: "wrap",
          py: 1.5,
        }}
      >
        <Box sx={{ flexGrow: 1, minWidth: 150 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, letterSpacing: -0.5 }}
          >
            <Box component="span" sx={{ color: "#4f46e5" }}>
              Contact
            </Box>{" "}
            Manager
          </Typography>

          <Typography
            variant="caption"
            sx={{ color: "#788398" }}
          >
            Workspace / Contacts
          </Typography>
        </Box>

        <Search
          sx={{
            bgcolor: "#f5f7fb",
            border: "1px solid #e5eaf2",
            borderRadius: 2,
            width: { xs: "100%", sm: 220, md: 260 },
            order: { xs: 3, sm: 0 },
            "&:hover": { bgcolor: "#eef2ff" },
          }}
        >
          <SearchIconWrapper>
            <SearchIcon sx={{ color: "#788398" }} />
          </SearchIconWrapper>

          <StyledInputBase
            placeholder="Search contacts..."
            inputProps={{ "aria-label": "search contacts" }}
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            sx={{
              color: "#172033",
              "& .MuiInputBase-input": {
                width: "100%",
                padding: "10px 10px 10px 42px",
              },
            }}
          />
        </Search>

        <Select
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
          size="small"
          aria-label="Filter contacts"
          sx={{
            minWidth: 140,
            bgcolor: "#ffffff",
            borderRadius: 2,
            fontSize: 13,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e0e6f0",
            },
          }}
        >
          <MenuItem value="all">All Contacts</MenuItem>
          <MenuItem value="Family">Family</MenuItem>
          <MenuItem value="Friend">Friends</MenuItem>
          <MenuItem value="Work">Work</MenuItem>
          <MenuItem value="favourite">⭐ Favourites</MenuItem>
        </Select>

        <Addcontact />
        <CsvExport />

        <Button
          variant="outlined"
          color="error"
          onClick={handlelogout}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 650,
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  </Box>
);

}
