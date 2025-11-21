import createHttpError from "http-errors"
import jwt from "jsonwebtoken"
import { User } from "../Users/user.model"

export async function AuthGuard(req , res , next){
    try{
        const authorization = req.headers?.authorization ?? undefined
        if(!authorization) throw createHttpError(403,"login to your account")
        const [bearer,token] = authorization?.split(" ")
        if(!bearer || bearer.toLowerCase()!=="bearer") throw createHttpError(403,"login to your account")
        const verified = jwt.verify(authorization,process.env.ACCESS_TOKEN_SECRET)
        if(!verified) throw createHttpError(401,"login to your account")
        const user = await User.findByPk(verified.id)
        if(!user) throw createHttpError(401,"login to your account")       
        req.user = {
            id:user.id,
            mobile:user.mobile,
            fullname : user?.fullname    
        }
        next()
       
    }catch(err){    
        next(err)
    }
  }