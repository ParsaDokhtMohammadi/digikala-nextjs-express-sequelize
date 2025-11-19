import sequelize from "./sequelize.config.js";
import { Product , ProductColor , ProductDetail , ProductSize } from "../modules/Products/product.model.js";
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
    console.log("connected to db");
}
