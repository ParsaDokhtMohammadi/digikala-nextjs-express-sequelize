import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize.config.js";
export const discount = sequelize.define("discount",{
    produt_id : {type : DataTypes.STRING},
    code : {type : DataTypes.STRING,allowNull:false},
    amount : {type : DataTypes.INTEGER},
    precent : {type : DataTypes.INTEGER},
    limit : {type:DataTypes.INTEGER},
    usage : {type:DataTypes.INTEGER},
    type : {type : DataTypes.ENUM("Cart","product"),allowNull:false},
    expires_in : {type:DataTypes.DATE}
},{
    updatedAt:false,
    createdAt : "created_at",
    freezeTableName:true
})