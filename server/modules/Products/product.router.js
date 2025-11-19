import { Router } from "express"
import { validate } from "express-validation"
import { ProductValidation } from "./product.validation.js"
import { createProduct } from "./product.service.js"

const productRouter = Router()

productRouter.post("/create",validate(ProductValidation),createProduct) 

export {productRouter}