import {Router} from "express"
import { checkOtp, sendOtp } from "./auth.service.js"

const AuthRouter = Router()

AuthRouter.post("/sendOtp",sendOtp)
AuthRouter.post("/checkOtp",checkOtp)

export {AuthRouter}