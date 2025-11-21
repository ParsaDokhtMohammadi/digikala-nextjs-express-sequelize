import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize.config.js";

export const Cart = sequelize.define("cart",{
    user_id : {type:DataTypes.INTEGER,allowNull:false},
    product_id : {type:DataTypes.INTEGER , allowNull : true},
    size_id : {type:DataTypes.INTEGER , allowNull:true},
    color_id : {type:DataTypes.INTEGER , allowNull:true},
    discount_id : {type:DataTypes.INTEGER , allowNull:true},
    count : {type : DataTypes.STRING,allowNull:false}
},{
    timestamps:false,
    freezeTableName:true
})