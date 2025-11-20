import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize.config.js"; 

export const User = sequelize.define("user",{
    fullname : {type:DataTypes.STRING , allowNull:true},
    mobile : {type:DataTypes.STRING , allowNull:false},
},{
    updatedAt : false,
    createdAt : "created_at",
    freezeTableName:true
})

export const Otp = sequelize.define("user_otp",{
    code : {type:DataTypes.STRING , allowNull : false},
    user_id : {type : DataTypes.INTEGER , allowNull : false},
    expires_in : {type:DataTypes.DATE , allowNull  : false}
},{
    timestamps : false,
    freezeTableName : true
})