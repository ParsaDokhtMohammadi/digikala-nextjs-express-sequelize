import { Router } from "express"
import { validate } from "express-validation"
import { ProductValidation } from "./product.validation.js"
import { createProduct, getAllProducts } from "./product.service.js"

const productRouter = Router()

productRouter.post("/create",validate(ProductValidation),createProduct) 
productRouter.get("/",getAllProducts) 

export {productRouter}