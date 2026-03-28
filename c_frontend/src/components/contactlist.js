import React, { useState } from "react";
import {
  useDeletecontactsMutation,
  useEditcontactsMutation,
  useGetcontactsQuery,
} from "../redux_services/apiEndpoints";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

export default function Contactlist() {
  const { data } = useGetcontactsQuery();
  const [deletecontact] = useDeletecontactsMutation();
  const [editcontact] = useEditcontactsMutation();
  const filter = useSelector((state) => state.filter.value);
  const [form, setform] = useState({
    contactName: "",
    contactEmail: "",
    contactNumber: "",
    contactType: "",
    isFavourite: false,
  });

  const [editid, seteditid] = useState("");

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handlesetedit = (item) => {
    seteditid(item.id);
    setform({
      contactName: item.contactName,
      contactEmail: item.contactEmail,
      contactNumber: item.contactNumber,
    });
  };

  const handleedit = async () => {
    try {
      await editcontact({ id: editid, ...form }).unwrap();
      alert("Updated successfully");
      seteditid("");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  const toggleFavourite = async (item) => {
    try {
      await editcontact({
        id: item.id,
        isFavourite: !item.isFavourite,
      }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleTypeChange = async (e, item) => {
    try {
      await editcontact({
        id: item.id,
        contactType: e.target.value,
      }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const DemoPaper = styled(Paper)(({ theme }) => ({
    width: "100%",
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    flexWrap: "wrap",
    boxSizing: "border-box",
  }));

  /////////this part is from chat gpt

  const filteredData = data?.filter((item) => {
    if (filter === "all") return true;
    if (filter === "favourite") return item.isFavourite;
    return item.contactType === filter;
  });

  return (
    <Box
      sx={{
        width: "80%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        backgroundColor: "maroon",
        boxSizing: "border-box",
        overflow: "auto",
      }}
    >
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((item) =>
          editid === item.id ? (
            <DemoPaper
              variant="outlined"
              key={item.id}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Input
                name="contactName"
                placeholder="name"
                value={form.contactName}
                onChange={handlechange}
              />
              <Input
                name="contactEmail"
                placeholder="email"
                value={form.contactEmail}
                onChange={handlechange}
              />
              <Input
                name="contactNumber"
                placeholder="phone"
                value={form.contactNumber}
                onChange={handlechange}
              />
              <Button variant="contained" onClick={() => handleedit()}>
                update
              </Button>
              <Button variant="contained" onClick={() => seteditid("")}>
                cancil
              </Button>
            </DemoPaper>
          ) : (
            <DemoPaper
              variant="outlined"
              key={item.id}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p
                style={{ cursor: "pointer" }}
                onClick={() => toggleFavourite(item)}
              >
                {item.isFavourite ? "⭐" : "☆"}
              </p>
              <p>{item.contactName}</p>
              <p>{item.contactEmail}</p>
              <p>{item.contactNumber}</p>
              <select
                value={item.contactType || ""}
                onChange={(e) => handleTypeChange(e, item)}
              >
                <option value="">Select</option>
                <option value="Family">Family</option>
                <option value="Friend">Friend</option>
                <option value="Work">Work</option>
              </select>
              <Button variant="contained" onClick={() => handlesetedit(item)}>
                edit
              </Button>
              <Button
                variant="contained"
                onClick={async () => {
                  try {
                    await deletecontact(item.id).unwrap();
                    alert("Deleted successfully");
                  } catch (err) {
                    console.log("del errr", err);
                    alert(err?.data?.msg || "Delete failed");
                  }
                }}
              >
                delete
              </Button>
            </DemoPaper>
          ),
        )
      ) : (
        <p>No Data Found</p>
      )}
    </Box>
  );
}
