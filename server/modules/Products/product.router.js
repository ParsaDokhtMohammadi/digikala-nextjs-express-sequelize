import { Router } from "express"
import { validate } from "express-validation"
import { ProductValidation } from "./product.validation.js"
import { createProduct, getAllProducts, getProductById } from "./product.service.js"

const productRouter = Router()

productRouter.post("/create",validate(ProductValidation),createProduct) 
productRouter.get("/",getAllProducts) 
productRouter.get("/:id",getProductById) 

export {productRouter}