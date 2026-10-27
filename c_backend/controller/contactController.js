const { contactmodel } = require("../models/contactmodel");
const xlsx= require("xlsx")
const fs= require("fs");
const { dbconnection } = require("../config/dbconnection");
///////////////get contact
const getContact = async (req, res) => {
  try {
    const allcontact = await contactmodel.findAll();
    res.json(allcontact);
  } catch (error) {
    console.log("ERROR FETCH:", error);

    res.json({
      msg: "failed to fetch contact",
      error: error.message,
    });
  }
};
//////////////

const createContact = async (req, res) => {
  try {
    const { contactName, contactEmail, contactNumber,contactType ,isFavourite} = req.body;

      if (!contactName || !contactEmail || !contactNumber) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }

       const  contactnumvalue = contactNumber.replace(/\D/g, "");

       
      if (contactnumvalue.length < 10 || contactnumvalue.length > 11) {
      return res.status(400).json({
        msg: "Enter valid phone number ",
      });
    }


     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      return res.status(400).json({
        msg: "Enter valid email format",
      });
    }  
 
    await contactmodel.create({
      contactName,
      contactEmail,
      contactNumber:contactnumvalue,
      contactType,
      isFavourite
    });

    res.json({ msg: "contact added" });
  } catch (error) {
    res.json({ msg: "failed to create contact" });
    console.log("failed to create contact. Error: ", error);
  }
};

//////////////
const deletecontact = async (req, res) => {
  try {
    const { id } = req.params;
    await contactmodel.destroy({
      where: { id },
    });
    res.json({ msg: "contact deleted" });
  } catch (error) {
    console.log(err);
  }
};
///////////////////////////////////////////
const editcontact = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await contactmodel.update(req.body, {
      where: { id },
    });
    console.log("UPDATED RESULT:", updated);
    res.json({ msg: "Task updated" });

  } catch (error) {
    console.log("edit err", error);
  }
};
//////////////////////////////////
const exportcsv = async (req, res) => {
  try {
    const contacts = await contactmodel.findAll();

    const worksheet = xlsx.utils.json_to_sheet(
      contacts.map(c => c.toJSON())
    );

    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Contact");

    const filepath = "./contact.xlsx";
    xlsx.writeFile(workbook, filepath);

    res.download(filepath, "contact.xlsx", () => {
      fs.unlinkSync(filepath);
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
////////////////////////
const importcsv = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheet_name = workbook.SheetNames[0];
    const rawData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name]);

    const contacts = rawData.map((row) => {
      const phone = String(row.contactNumber || row.Number || "").replace(/\D/g, "");

      return {
        contactName: row.contactName || row.Name || "",
        contactEmail: row.contactEmail || row.Email || "",
        contactNumber: phone,
        contactType: row.contactType || row.Type || "",
        isFavourite: row.isFavourite === true || row.isFavourite === "true",
      };
    }).filter(c => 
      c.contactName && 
      c.contactEmail && 
      c.contactNumber.length >= 10
    );

    if (contacts.length === 0) {
      return res.status(400).json({ message: "No valid data found in file" });
    }

    await contactmodel.bulkCreate(contacts);

    fs.unlinkSync(req.file.path);

    res.json({
      message: "Contacts imported successfully",
      count: contacts.length
    });

  } catch (err) {
    console.log("IMPORT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
//////////////////

module.exports = { getContact, createContact, deletecontact,editcontact,exportcsv, importcsv };
