import { ObjectId } from "mongodb";
import mongoose, { Mongoose } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let Schema = mongoose.Schema;

const BreederSchema = new Schema(
    {
        first_name: String,
        last_name: String,
        phone_number: String,
        address: String,
        city: String,
        province: String,
        postal_code: String,
        email: String,
        questionnaire: Object,
        waitlist_ids: Array,
        dogs: Array,
        password: {
            type: String,
            required: [true, 'Please provide password'],
            minlength: 6,
        },
    }
);


BreederSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

BreederSchema.methods.createJWT = function() {
    return jwt.sign({breeder_id: this._id}, process.env.JWT_SECRET , {expiresIn:  process.env.JWT_LIFETIME});
}

BreederSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}


const Breeder = mongoose.model('Breeder', BreederSchema);

export default Breeder
