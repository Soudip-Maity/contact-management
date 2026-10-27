const { Sequelize } = require("sequelize");

const sequelize= new Sequelize("contact_management","root","123456",{
    host:"localhost",
    dialect:"mysql",

})

const dbconnection=async()=>{
    try {
        sequelize.authenticate()
        console.log("connect database to the server successfully ");

    } catch (error) {
        console.log("failed to connect database to the server ");
        
    }
}


const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports= {sequelize,dbconnection}