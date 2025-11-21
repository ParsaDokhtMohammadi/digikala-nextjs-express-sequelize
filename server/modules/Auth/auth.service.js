import createHttpError from "http-errors";
import { Otp, User } from "../Users/user.model.js";

export async function sendOtp(req, res, next) {
  try {
    const { mobile } = req.body;

    if (!mobile) throw createHttpError(400, "mobile is required");

    const code = Math.floor(1000 + Math.random() * 90000);

    let user = await User.findOne({ where: { mobile } });

    if (!user) {
      user = await User.create({
        mobile
      });
    }

    let otp = await Otp.findOne({
      where: { user_id: user.id }
    });

    const expires_in = new Date(Date.now() + 120 * 1000)

    if (otp) {
      await otp.update({ code, expires_in });
    } else {
      otp = await Otp.create({
        code,
        user_id: user.id,
        expires_in
      });
    }

    res.json({
      otp: code,
      user: user.id,
      message: "otp sent successfully"
    });

  } catch (err) {
    next(err);
  }
}

export async function checkOtp(req , res , next) {
  try{
    const {mobile,code} = req.body
    console.log(code);
    console.log(mobile);
    
    if (!mobile || !code) throw createHttpError(400, "mobile and code are required");
    let user = await User.findOne({ where: { mobile },
    include : [{model : Otp , as : "Otp"}]});
    if(!user)throw createHttpError(404,"user does not exist")
    console.log(user?.Otp);
    
    if(user?.Otp?.code !==code)throw createHttpError(401,"code is invalid")
    if(user?.Otp?.expires_in < new Date())throw createHttpError(401,"code is expired")
    res.json({
      message:"logged in successfuly"
    })
  }catch(err){
    next(err)
  }
}
