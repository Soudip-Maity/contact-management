import * as React from "react";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useCreatecontactsMutation } from "../redux_services/apiEndpoints";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Addcontact() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, { isLoading, error }] = useCreatecontactsMutation();
  const [contact, setcontact] = useState({
    contactName: "",
    contactEmail: "",
    contactNumber: "",
    contactType: "",
    isFavourite: false,
  });
  const handleChange = (e) => {
    setcontact({ ...contact, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await data(contact).unwrap();
      alert(res.msg);
    } catch (err) {
      alert(err.data?.msg || "Error");
      console.log(err);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>create contact</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div
              style={{
                width: "100%",
                height: "400px",
                backgroundColor: "pink",
                boxSizing: "border-box",
                color: "white",
                margin: "0",
                padding: "0",
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "10px",
                paddingRight: "10px",
                gap:"10px"
              }}
            >
              <form onSubmit={handlesubmit}>
                <TextField
                  variant="outlined"
                  name="contactName"
                  placeholder="Name"
                  value={contact.contactName}
                  onChange={handleChange}
                />

                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="contactEmail"
                  placeholder="Email"
                  value={contact.contactEmail}
                  onChange={handleChange}
                />

                <TextField
                  variant="outlined"
                  name="contactNumber"
                  placeholder="Phone"
                  value={contact.contactNumber}
                  onChange={handleChange}
                />

                <Select
                  name="contactType"
                  value={contact.contactType}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="Family">Family</MenuItem>
                  <MenuItem value="Friend">Friend</MenuItem>
                  <MenuItem value="Work">Work</MenuItem>
                </Select>

                <Button type="submit" disabled={isLoading} variant="contained">
                  {isLoading ? "Loading..." : "create"}
                </Button>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
