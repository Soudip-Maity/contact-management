import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";

export default function CsvExport() {
 const [file,setfile]=useState(null)
  const handle_export_contact = () => {
    window.open("http://localhost:5000/export", "_blank");
  };
 const handle_import_contact = async (e) => {
  e.preventDefault();

  if (!file) {
    alert("Please select a file");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
  const res = await fetch("http://localhost:5000/import", {
  method: "POST",
  body: formData,
});

    const data = await res.json();
    alert(data.message);
  } catch (err) {
    console.error(err);
  }
};


return (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 1,
    }}
  >
    <Input
      type="file"
      inputProps={{ accept: ".csv" }}
      onChange={(e) => setfile(e.target.files[0])}
      sx={{
        maxWidth: 180,
        fontSize: 12,
        "&:before": { borderBottomColor: "#dfe5ef" },
      }}
    />

    <Button
      variant="outlined"
      onClick={handle_import_contact}
      sx={{
        borderRadius: 2,
        textTransform: "none",
        borderColor: "#dfe5ef",
        color: "#344054",
        fontWeight: 600,
      }}
    >
      Import CSV
    </Button>

    <Button
      variant="contained"
      onClick={handle_export_contact}
      sx={{
        bgcolor: "#0f766e",
        borderRadius: 2,
        textTransform: "none",
        boxShadow: "none",
        "&:hover": { bgcolor: "#115e59", boxShadow: "none" },
      }}
    >
      Export CSV
    </Button>
  </Box>
);

}
