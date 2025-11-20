import createHttpError from "http-errors";
import { Otp, User } from "../Users/user.model.js";

export async function sendOtp(req, res, next) {
  try {
    const { mobile } = req.body;

    if (!mobile) throw createHttpError(400, "mobile is required");

    // Generate 4-digit OTP
    const code = Math.floor(1000 + Math.random() * 90000);

    // Find or create user
    let user = await User.findOne({ where: { mobile } });

    if (!user) {
      user = await User.create({
        mobile
      });
    }

    // Check if user already has OTP
    let otp = await Otp.findOne({
      where: { user_id: user.id }
    });

    const expires_in = new Date(Date.now() + 60 * 1000); // 1 min

    if (otp) {
      // Update old OTP
      await otp.update({ code, expires_in });
    } else {
      // Create new OTP
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
