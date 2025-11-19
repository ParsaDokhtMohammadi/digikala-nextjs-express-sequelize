import createHttpError from "http-errors"
import { ProductTypes } from "../../common/constants/product.const.js"
import { Product, ProductColor, ProductDetail, ProductSize } from "./product.model.js"
import { Model } from "sequelize"

export async function createProduct(req , res , next){
    try{
        const {
            title , 
            price , 
            discount , 
            active_discount , 
            description , 
            img_url , 
            details ,
            colors ,
            sizes ,
            count ,
            type , } = req.body
            if(!Object.values(ProductTypes).includes(type))throw createHttpError(400 , "invalid product type")
            const product = await Product.create({
                title,
                description,
                price,
                discount,
                active_discount,
                img_url,
                type,
            })
            if(details && details.length > 0){
            for(const detail of details){
                await ProductDetail.create({
                    key : detail.key,
                    value : detail.value,
                    product_id : product.id
                })}
            }
     
            
            if(type === ProductTypes.Sizing){
                if(sizes && sizes.length > 0){
                    for(const size of sizes){
                        await ProductSize.create({
                            size : size.size,
                            product_id : product.id,
                            count : size.count,
                            price : size.price,
                            discount : size.discount,
                            active_discount : size.active_discount
                        })}
                    }
            }
            if(type === ProductTypes.Coloring){
                if(colors && colors.length > 0){
                    for(const color of colors){
                        await ProductColor.create({
                            color_name : color.color_name,
                            color_hex : color.color_hex,
                            product_id : product.id,
                            count : color.count,
                            price : color.price,
                            discount : color.discount,
                            active_discount : color.active_discount
                        })}
                    }
            }
        return res.json({
            statusCode : 200,
            message : "product created succesfully"
        })
    }catch(err){
        next(err)
    }
}
export async function getAllProducts(req , res , next){
    try{
        const {page} = req.query
        const  pageNumber = page ? +page : 1
        const products = await Product.findAll({limit:2,offset:(pageNumber-1)*2})
        res.json({
            statusCode : 201,
            data : products
        })
    }catch(err){
        next(err)
    }
}
export async function getProductById(req , res , next) {
    try{
        const {id} = req.params
        const product = await Product.findByPk(id,{
            include : [
                {model : ProductDetail , as : "details"},
                {model : ProductColor , as : "colors"},
                {model : ProductSize , as : "sizes"}
            ]
        })
        if(!product){
            res.status(404).json({
                message : "product not found"
            })
        }
        res.status(200).json({
            data : product
        })

    }catch(err){
        next(err)
    }
}