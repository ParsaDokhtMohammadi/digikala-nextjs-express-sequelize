import createHttpError from "http-errors"
import { Product, ProductColor, ProductSize } from "../Products/product.model.js"
import { ProductTypes } from "../../common/constants/product.const.js"

export async function addToCartHandler(req , res , next) {
    try{
        const {id} = req?.user ?? {}

        const {product_id,size_id,color_id} = req.body
        const product = await Product.findByPk(product_id)
        if(!product_id)throw createHttpError(404,"product not found")

        const CartItem = {
            product_id : product.id,
            user_id : id
        }

        if(product.type === ProductTypes.Coloring){
            if(!color_id) createHttpError(401,"send color details")
            const productColor = await ProductColor.findByPk(color_id)
            if(!productColor) createHttpError(404,"product color not found")
            CartItem['color_id'] = color_id
        }
        if(product.type === ProductTypes.Sizing){
            if(!size_id) createHttpError(401,"send size details")
            const productSize = await ProductSize.findByPk(color_id)
            if(!productSize) createHttpError(404,"product size not found")
            CartItem['size_id'] = size_id
        }
    

    }catch(err){
        next(err)
    }
}