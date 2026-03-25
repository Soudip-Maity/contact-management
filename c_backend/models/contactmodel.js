const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbconnection");

const contactmodel = sequelize.define(
  "Contact",
  {
    contactName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    contactEmail:{
        type:DataTypes.STRING,
        allowNull:false
    },
    
    contactNumber:{
        type:DataTypes.STRING,
        allowNull:false
    },
    contactType:{
        type:DataTypes.STRING,
        allowNull:true
    },
   isFavourite: {
  type: DataTypes.BOOLEAN,
  allowNull: true,
  defaultValue: false
}
  },
  {
    freezeTableName: true,
  },
);


module.exports={contactmodel}