import { validate , Joi } from "express-validation"
import { ProductTypes } from "../../common/constants/product.const.js     "
export const ProductValidation = {
    body : Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        type:Joi.string().valid(...Object.values(ProductTypes)).required(),
        price:Joi.number().optional().allow(null),
        discount:Joi.number().optional().allow(null),
        active_discout:Joi.number().optional().allow(null),
        count : Joi.number().optional().allow(null),
        details : Joi.array().items(Joi.object({
            key:Joi.string().required(),
            value:Joi.string().required(),
        })),
        colors : Joi.array().items(Joi.object({
            color_name:Joi.string().required(),
            color_hex:Joi.string().required(),
            count:Joi.number().required(),
            price:Joi.number().required(),
            discount:Joi.number().optional().allow(null),
            active_discount:Joi.boolean().optional().allow(null),
        })),
        sizes : Joi.array().items(Joi.object({
            size:Joi.string().required(),
            count:Joi.number().required(),
            price:Joi.number().required(),
            discount:Joi.number().optional().allow(null),
            active_discount:Joi.boolean().optional().allow(null),
        })),
    })
}