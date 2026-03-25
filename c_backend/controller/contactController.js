const { contactmodel } = require("../models/contactmodel");

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

    await contactmodel.create({
      contactName,
      contactEmail,
      contactNumber,
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
//////////////////

module.exports = { getContact, createContact, deletecontact,editcontact };
