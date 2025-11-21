import jwt from "jsonwebtoken"
import createHttpError from "http-errors";
import { User } from "../../modules/Users/user.model.js";
export function CreateToken(payload){
    const {ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET} = process.env
  
    const accessToken = jwt.sign(payload , ACCESS_TOKEN_SECRET,{
        expiresIn : "7d"
    })
    const refreshToken = jwt.sign(payload , REFRESH_TOKEN_SECRET,{
        expiresIn : "30d"
    })
    return {accessToken , refreshToken}
}
export async function verifiyRefreshTokenHandler(req , res , next){
    try{
        const {refreshToken} = req.body

        
        if(!refreshToken) throw createHttpError(401,"login to your account")
        const verified = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)

    
        if(!verified) throw createHttpError(401,"login to your account")
        const user = await User.findByPk(verified.id)
        if(!user) throw createHttpError(401,"login to your account")       
        const {accessToken , refreshToken:newRefreshToken} = CreateToken({userId : user.id , mobile:user.mobile})
        console.log(accessToken,newRefreshToken);
        
        res.json({
            accessToken,
            refreshToken:newRefreshToken
        })
    }catch(err){    
        throw createHttpError(401,"login to your account")
    }
}