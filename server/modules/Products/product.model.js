import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize.config.js";
import { ProductTypes } from "../../common/constants/product.const.js";

const Product = sequelize.define("product",{
    id : {type:DataTypes.INTEGER , primaryKey:true , autoIncrement:true},
    title : {type : DataTypes.STRING,allowNull:false},
    price : {type : DataTypes.INTEGER , allowNull:false},
    discount : {type : DataTypes.INTEGER},
    active_discount : {type:DataTypes.BOOLEAN , defaultValue : false},
    description : {type:DataTypes.TEXT},
    img_url : {type:DataTypes.STRING},
    type:{type:DataTypes.ENUM(...Object.values(ProductTypes))},
    count : {type : DataTypes.INTEGER , defaultValue : 0}
    
},{
    freezeTableName : true,
    createdAt : "created_at",
    updatedAt : "updated_at"
})

const ProductDetail = sequelize.define("product_detail",{
    id : {type:DataTypes.INTEGER , primaryKey:true , autoIncrement:true},
    key : {type:DataTypes.STRING , allowNull : false},
    value : {type:DataTypes.STRING , allowNull : false},
    product_id : {type:DataTypes.STRING , allowNull : false}
},{
    freezeTableName : true,
    timestamps : false
})
const ProductColor = sequelize.define("product_color",{
    id : {type:DataTypes.INTEGER , primaryKey:true , autoIncrement:true},
    color_name : {type:DataTypes.STRING , allowNull : false},
    color_hex : {type:DataTypes.STRING , allowNull : false},
    product_id : {type:DataTypes.STRING , allowNull : false},
    count : {type : DataTypes.INTEGER , defaultValue : 0},
    price : {type : DataTypes.INTEGER , allowNull:false},
    discount : {type : DataTypes.INTEGER},
    active_discount : {type:DataTypes.BOOLEAN , defaultValue : false}
    
},{
    freezeTableName : true,
    timestamps : false
})
const ProductSize = sequelize.define("product_size",{
    id : {type:DataTypes.INTEGER , primaryKey:true , autoIncrement:true},
    size : {type:DataTypes.STRING , allowNull : false},
    product_id : {type:DataTypes.STRING , allowNull : false},
    count : {type : DataTypes.INTEGER , defaultValue : 0},
    price : {type : DataTypes.INTEGER},
    discount : {type : DataTypes.INTEGER},
    active_discount : {type:DataTypes.BOOLEAN , defaultValue : false}
    
},{
    freezeTableName : true,
    timestamps : false
})

export {Product , ProductColor , ProductDetail , ProductSize}