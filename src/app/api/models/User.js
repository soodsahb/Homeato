// ethe apa ek user schema bna rhe aa apa ethe define krna ki sada user database ch kida da lguga
import { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";
//password di validity vi check kr rhe aa ethe mangoose vrt rhe aa

const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

// Use a pre-save middleware to hash the password before saving to the database
userSchema.pre("save", async function (next) {
  const user = this;

  // Hash the password only if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Replace the plain password with the hashed one
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
//hun apa user export krna models te model class use honi ethe mongoose di apa user add krna database ch ta krke eh timepass ho reha

export const User = models?.User || model("User", userSchema);
