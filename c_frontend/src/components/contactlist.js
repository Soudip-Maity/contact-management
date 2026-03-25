import React, { useState } from "react";
import {
  useDeletecontactsMutation,
  useEditcontactsMutation,
  useGetcontactsQuery,
} from "../redux_services/apiEndpoints";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

export default function Contactlist() {
  const { data } = useGetcontactsQuery();
  const [deletecontact] = useDeletecontactsMutation();
  const [editcontact] = useEditcontactsMutation();

  const [form, setform] = useState({
    contactName: "",
    contactEmail: "",
    contactNumber: "",
    contactType: "",
    isFavourite: false,
  });

  const [editid, seteditid] = useState("");

 const handlechange = (e) => { setform({ ...form, [e.target.name]: e.target.value }); };

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

  return (
    <div
      style={{
        width: "50%",
        height: "600px",
        backgroundColor: "purple",
        boxSizing: "border-box",
        color: "white",
        margin: "0",
        padding: "10px",
      }}
    >
      {data && data.length > 0 ? (
        data.map((item) =>
          editid === item.id ? (
            <div
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
            </div>
          ) : (
            <div
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
            </div>
          ),
        )
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  );
}
