import {Router} from "express"
import { checkOtp, sendOtp } from "./auth.service.js"
import { verifiyRefreshTokenHandler } from "../../common/utils/auth.utils.js"

const AuthRouter = Router()

AuthRouter.post("/sendOtp",sendOtp)
AuthRouter.post("/checkOtp",checkOtp)
AuthRouter.post("/refreshTokens",verifiyRefreshTokenHandler)

export {AuthRouter}