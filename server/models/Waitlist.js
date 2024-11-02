import { ObjectId } from "mongodb";
import mongoose, { Mongoose } from "mongoose";

let Schema = mongoose.Schema;

const WaitlistSchema = new Schema(
    {
        breeder_id: ObjectId,
        breed_type: String,
        availability: Number,
        buyers: Array,
        price: Number,
        location: Object,
        province: String,
        deposit_amount: Number, //potentially
        active_users: Number
    }
);

const Waitlist = mongoose.model('Waitlist', WaitlistSchema);

export default Waitlist
