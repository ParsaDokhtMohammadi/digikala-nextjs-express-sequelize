import jwt from "jsonwebtoken"
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