const express= require("express");
const { getContact, createContact, deletecontact, editcontact } = require("../controller/contactController");
const { register, login } = require("../controller/authController");
const router= express.Router()

router.post("/register",register)
router.post("/login",login)

router.get("/contact",getContact)
router.post("/contact",createContact)
router.delete("/contact/:id",deletecontact)
router.put("/contact/:id",editcontact)

module.exports= router;