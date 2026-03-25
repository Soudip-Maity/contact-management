const express= require("express");
const { getContact, createContact, deletecontact, editcontact } = require("../controller/contactController");
const router= express.Router()

router.get("/contact",getContact)
router.post("/contact",createContact)
router.delete("/contact/:id",deletecontact)
router.put("/contact/:id",editcontact)

module.exports= router;