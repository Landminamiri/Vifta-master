import { ObjectId } from "mongodb";
import mongoose, { Mongoose } from "mongoose";

let Schema = mongoose.Schema;

const RequestSchema = new Schema(
    {
        user_id: ObjectId,
        waitlist_id: ObjectId,
        user_name: String,
        city: String,
        province: String,
        contact: String,
        questionnaire_answers: Object,
        breeder_comments: Object,
        status: String,
        message: String
    }
);

const Request = mongoose.model('Request', RequestSchema);

export default Request
