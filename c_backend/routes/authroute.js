const express= require("express");
const { getContact, createContact, deletecontact, editcontact, exportcsv, importcsv } = require("../controller/contactController");
const { register, login } = require("../controller/authController");
const router= express.Router()

//////////////////////////////////////
const fs = require("fs");
const multer = require("multer");
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV/Excel files allowed"));
    }
  },
});

////////////////////////////

router.post("/register",register)
router.post("/login",login)

router.get("/contact",getContact)
router.post("/contact",createContact)
router.delete("/contact/:id",deletecontact)
router.put("/contact/:id",editcontact)
router.get("/export",exportcsv)
router.post("/import", upload.single("file"),importcsv)




module.exports= router;