import React, { useEffect, useState } from "react";
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
  const search = useSelector((state) => state.filter.search);
  const [form, setform] = useState({
    contactName: "",
    contactEmail: "",
    contactNumber: "",
    contactType: "",
    isFavourite: false,
  });

  const [editid, seteditid] = useState("");
  const [file, setfile] = useState();
  const [page, setPage] = useState(1);
  const limit = 5;
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
    gap: "12px",
    flexWrap: "wrap",
    boxSizing: "border-box",
    border: "1px solid #e5eaf2",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(22,34,58,0.025)",
    backgroundColor: "#fff",
    [theme.breakpoints.down("sm")]: {
      alignItems: "flex-start",
      padding: theme.spacing(1.5),
    },
  }));

  /////////this part is from chat gpt

  const filteredData = data?.filter((item) => {
    if (filter === "all") return true;
    if (filter === "favourite") return item.isFavourite;
    return item.contactType === filter;
  });
  //////////////////////////////////////
  const finalData = filteredData?.filter((item) => {
    if (!search) return true;

    return (
      item.contactName?.includes(search) || item.contactNumber?.includes(search)
    );
  });

  const handlefile = (e) => {
    setfile(e.target.files[0]);
  };

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = finalData?.slice(startIndex, endIndex);

  const totalPages = Math.ceil((finalData?.length || 0) / limit);

  //////////
  useEffect(() => {
    setPage(1);
  }, [search, filter]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxSizing: "border-box",
      }}
    >
      {paginatedData && paginatedData.length > 0 ? (
        paginatedData.map((item) =>
          editid === item.id ? (
            <DemoPaper
              variant="outlined"
              key={item.id}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <form
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "black",
                  borderRadius: "50%",
                }}
                enctype="multipart/form-data"
              >
                <input type="file" onChange={handlefile} />
              </form>
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
              sx={{}}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "16px",
              }}
            >
              <Button
                aria-label={
                  item.isFavourite
                    ? "Remove from favourites"
                    : "Add to favourites"
                }
                onClick={() => toggleFavourite(item)}
                sx={{
                  minWidth: 40,
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  fontSize: 21,
                  color: item.isFavourite ? "#e5a000" : "#94a0b4",
                  bgcolor: item.isFavourite ? "#fff8df" : "#f5f7fb",
                }}
              >
                {item.isFavourite ? "★" : "☆"}
              </Button>

              <p style={{ flex: 1 }}>{item.contactName}</p>
              <p style={{ flex: 1 }}>{item.contactEmail}</p>
              <p style={{ width: "120px" }}>{item.contactNumber}</p>
              <select
                value={item.contactType || ""}
                onChange={(e) => handleTypeChange(e, item)}
                style={{ width: "120px" }}
              >
                <option value="">Select</option>
                <option value="Family">Family</option>
                <option value="Friend">Friend</option>
                <option value="Work">Work</option>
              </select>
              <Button
                variant="outlined"
                onClick={() => handlesetedit(item)}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  borderColor: "#dfe5ef",
                  color: "#4f46e5",
                }}
              >
                Edit
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={async () => {
                  try {
                    await deletecontact(item.id).unwrap();
                    alert("Deleted successfully");
                  } catch (err) {
                    console.log("del errr", err);
                    alert(err?.data?.msg || "Delete failed");
                  }
                }}
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                Delete
              </Button>
            </DemoPaper>
          ),
        )
      ) : (
        <p>No Data Found</p>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <Button
          variant="contained"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>

        <span style={{ color: "white", alignSelf: "center" }}>
          Page {page} of {totalPages}
        </span>

        <Button
          variant="contained"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </Box>
  );
}
