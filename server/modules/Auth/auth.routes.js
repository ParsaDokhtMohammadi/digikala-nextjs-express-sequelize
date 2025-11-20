import {Router} from "express"
import { sendOtp } from "./auth.service.js"

const AuthRouter = Router()

AuthRouter.post("/sendOtp",sendOtp)

export {AuthRouter}