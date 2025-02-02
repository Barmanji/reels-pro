import mongoose, { model, Schema, models } from "mongoose"; //model for creating new, models for giving an array of all models
import bcrypt from "bcrypt";

export interface IUser {
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
// <user> is the datetype of the User that we defined at the top, ITS TYPESCRIPT
const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })

userSchema.pre("save", async function(next) {  // pre hook runs just before saving userSchema
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = models?.User || model<IUser>("User", userSchema) // model import because we dont have to write mongoose.model
export default User;
