import { Router } from "express";
import { addToCartHandler } from "./Cart.service.js";

const CartRouter = Router()

CartRouter.post("/addProduct",addToCartHandler)

export {CartRouter}