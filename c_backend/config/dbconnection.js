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

module.exports= {sequelize,dbconnection}