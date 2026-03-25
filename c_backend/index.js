const express= require("express");
const router = require("./routes/authroute");
const { dbconnection, sequelize } = require("./config/dbconnection");
const { contactmodel } = require("./models/contactmodel");
const cors = require("cors"); 
const { FORCE } = require("sequelize/lib/index-hints");

const app = express();

app.use(cors()); 
app.use(express.json());
const port = 5000;


app.get("/",(req,res)=>{
    res.json({message:"backend is running on server ",port})
})

app.use("/",router)


app.listen(port,async ()=>{
     console.log(`server is running on the port ${port}`);
     await dbconnection();
     await sequelize.sync();
}) 