import { ObjectId } from "mongodb";
import mongoose, { Mongoose } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        first_name: String,
        last_name: String,
        phone_number: String,
        address: String,
        city: String,
        province: String,
        postal_code: String,
        email: String,
        password: {
            type: String,
            required: [true, 'Please provide password'],
            minlength: 6,
        },
        buyer_info: Object,
        waitlists: Object, //gonna have a reference to the waitlists they applied to, along with additional information. (status, date of last confirmation, deposit amount, deposit paid, price at time of joining),
        questionnaire: Object
    }
);

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET , {expiresIn:  process.env.JWT_LIFETIME});
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}


const User = mongoose.model('User', UserSchema);

export default User
