import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize.config.js"; 

export const RefreshToken = sequelize.define("refresh_token",{
    token : {type:DataTypes.TEXT , allowNull:false},
    userId : {type:DataTypes.STRING , allowNull:false},
},{
    updatedAt : false,
    createdAt : "created_at",
    freezeTableName:true
})

