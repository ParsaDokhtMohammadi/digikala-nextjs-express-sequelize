import sequelize from "./sequelize.config.js";
import { Product , ProductColor , ProductDetail , ProductSize } from "../modules/Products/product.model.js";
import { Otp, User } from "../modules/Users/user.model.js";
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
   
   
   
    console.log("connected to db");
}
