import * as React from "react";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useCreatecontactsMutation } from "../redux_services/apiEndpoints";
// import Input from "@mui/material/Input";
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
  <>
    <Button
      variant="contained"
      onClick={handleOpen}
      sx={{
        bgcolor: "#4f46e5",
        textTransform: "none",
        borderRadius: 2,
        px: 2,
        py: 1,
        fontWeight: 650,
        boxShadow: "none",
        "&:hover": { bgcolor: "#4338ca", boxShadow: "none" },
      }}
    >
      + Add Contact
    </Button>

    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 300 } }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "92%", sm: 440 },
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "#fff",
            border: "1px solid #e5eaf2",
            borderRadius: 4,
            p: { xs: 2.5, sm: 3.5 },
            boxShadow: "0 24px 80px rgba(22,34,58,0.20)",
            outline: "none",
          }}
        >
          <h2 className="cms-modal-title">Create a contact</h2>
          <p className="cms-modal-subtitle">
            Add someone's details to your contact directory.
          </p>

          <form
            onSubmit={async (e) => {
              await handlesubmit(e);
            }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <label className="cms-file-input">
              Profile image
              <input
                type="file"
                accept="image/*"
                style={{ display: "block", marginTop: 10, maxWidth: "100%" }}
              />
            </label>

            <TextField
              name="contactName"
              label="Full name"
              placeholder="Enter full name"
              value={contact.contactName}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              name="contactEmail"
              label="Email address"
              type="email"
              placeholder="name@example.com"
              value={contact.contactEmail}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="contactNumber"
              label="Phone number"
              placeholder="Enter phone number"
              value={contact.contactNumber}
              onChange={handleChange}
              fullWidth
            />

            <Select
              name="contactType"
              value={contact.contactType}
              onChange={handleChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled>
                Select contact category
              </MenuItem>
              <MenuItem value="Family">Family</MenuItem>
              <MenuItem value="Friend">Friend</MenuItem>
              <MenuItem value="Work">Work</MenuItem>
            </Select>

            <Box sx={{ display: "flex", gap: 1.5, mt: 1 }}>
              <Button
                variant="outlined"
                onClick={handleClose}
                fullWidth
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                fullWidth
                sx={{
                  bgcolor: "#4f46e5",
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: "none",
                }}
              >
                {isLoading ? "Creating..." : "Create Contact"}
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  </>
);

}
