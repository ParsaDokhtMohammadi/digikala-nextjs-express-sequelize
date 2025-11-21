import sequelize from "./sequelize.config.js";
import { Product , ProductColor , ProductDetail , ProductSize } from "../modules/Products/product.model.js";
import { Otp, User } from "../modules/Users/user.model.js";
import { RefreshToken } from "../modules/Users/refreshToken.model.js";
import { Cart } from "../modules/Cart/Cart.model.js";

export async function modelsInitial(){
    await sequelize.authenticate()
    await sequelize.sync({alter:true})
    //product relations
    Product.hasMany(ProductColor , {foreignKey : "product_id" , sourceKey : "id" ,as :"colors"})
    ProductColor.belongsTo(Product , {foreignKey : "product_id",targetKey:"id"})
    Product.hasMany(ProductDetail , {foreignKey : "product_id" , sourceKey : "id" ,as :"details"})
    ProductDetail.belongsTo(Product , {foreignKey : "product_id",targetKey:"id"})
    Product.hasMany(ProductSize , {foreignKey : "product_id" , sourceKey : "id" ,as :"sizes"})
    ProductSize.belongsTo(Product , {foreignKey : "product_id" , targetKey:"id"})
   
   //user relations
   User.hasOne(Otp,{foreignKey:"user_id",sourceKey : "id",as : "Otp"})
   Otp.belongsTo(User,{foreignKey:"user_id",targetKey:"id",as: "user"})
   
   //Cart relations
   Product.hasMany(Cart,{foreignKey:"product_id",sourceKey:"id",as:"cart"})
   ProductColor.hasMany(Cart,{foreignKey:"color_id",sourceKey:"id",as:"cart"})
   ProductSize.hasMany(Cart,{foreignKey:"size_id",sourceKey:"id",as:"cart"})
   User.hasMany(Cart,{foreignKey:"Cart_id",sourceKey:"id",as:"cart"})

   Cart.belongsTo(Product,{foreignKey:"product_id",targetKey:"id",as:"product"})
   Cart.belongsTo(User,{foreignKey:"user_id",targetKey:"id",as:"user"})
   Cart.belongsTo(ProductColor,{foreignKey:"color_id",targetKey:"id",as:"color"})
   Cart.belongsTo(ProductSize,{foreignKey:"size_id",targetKey:"id",as:"size"})


    console.log("connected to db");
}
