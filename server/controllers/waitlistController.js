import { ObjectId } from "mongodb";
import { StatusCodes } from 'http-status-codes';
import Waitlist from "../models/Waitlist.js"
import { addWaitlist } from "./userController.js";
import User from "../models/User.js";

const getWaitlists = async (req, res) => {
    const waitlist = await Waitlist.find()
    
    res.status(StatusCodes.OK).json(waitlist);
}

const getWaitlistByID = async (req, res) => {
    const waitlistID = req.params.waitlist_id;
    console.log(waitlistID)
    const objectwaitlistID = new ObjectId(waitlistID)

    const waitlist = await Waitlist.findOne(
        { _id: objectwaitlistID }
    )
    
    res.status(StatusCodes.OK).json(waitlist);
}

const getWaitlistsByIDs = async (req, res) => {
    const waitlist_ids = req.body;
    console.log(waitlist_ids)
    const objectIdArray = waitlist_ids.map(id => new ObjectId(id));

    await Waitlist.find(
        { _id: { $in: objectIdArray } }
    ).then( (result) => {
        res.status(StatusCodes.OK).json(result);
    })
    
}


const createWaitlist = async (req, res) => {
    const formData = req.body

    const breeder_id = formData.breeder_id
    const breed_type = formData.breed_type
    const city = formData.city
    const province = formData.province
    const price = formData.price
    const deposit_amount = formData.deposit_amount
    
    const buyers = []

    const breeder_id_object = new ObjectId(breeder_id)

    const location = {
        lat: 47.5004,
        lng: -52.7827,
        city: city
    }

    const waitlist = {
        breeder_id: breeder_id_object,
        breed_type: breed_type,
        buyers: buyers,
        location: location,
        province: province,
        price: price,
        deposit_amount: deposit_amount,
    }

    Waitlist.create(waitlist).then( (result) => {
        res.send(result)
    })

}

const addUserToWaitlist = async (req, res) => {
    const waitlist_id = req.params.waitlist_id;
    const user_id = req.params.user_id;

    const waitlist_id_Object = new ObjectId(waitlist_id)
    const user_id_Object = new ObjectId(user_id)

    const user = await User.findOne({ _id: user_id_Object })
    

    Waitlist.findOne(
        { _id: waitlist_id_Object}
    ).then( (waitlist) => {
        console.log(waitlist)
        const buyerSize = waitlist.buyers.length
        const object_to_push = {
            user_id: user_id_Object,
            user_name: user.email, //add the rest of the user info here
            rank: buyerSize+1,
            city: waitlist.location.city,
            province: waitlist.province,
        }
    
        Waitlist.updateOne(
            { _id: waitlist_id_Object },
            { $push: { buyers: object_to_push } }
        ).then( (result) => {
            res.send(result);
        })
    })

    
}

const removeUserFromWaitlist = async (req, res) => {
    const reqData = req.body;

    const waitlist_id = reqData.waitlist_id;
    const user_id = reqData.user_id;

    const waitlist_id_Object = new ObjectId(waitlist_id)
    const user_id_Object = new ObjectId(user_id)

    Waitlist.updateOne(
        { _id: waitlist_id_Object},
        { $pull: { buyers: user_id_Object } }
    ).then( (result) => {
        res.send(result);
    })
}

const getFilteredWaitlist = async (req, res) => {
    const reqData = req.body;

    const province = reqData.province
    const price = reqData.price
    const availability = reqData.availability
    const breed_type = reqData.breed_type
    const health_details = reqData.health_details

    let filterObject = {}

    if(province) {
        filterObject.province = province
    }

    if(price) {
        filterObject.price = { $lte: price }
    }

    if(availability) {
        filterObject.availability = { $lte: availability }
    }

    if(breed_type) {
        filterObject.breed_type = { $regex: breed_type, $options: 'i' }
    }

    if(health_details) {
        filterObject.health_details = health_details
    }

    Waitlist.find(filterObject)
    .then((result) => {
        res.send(result);
    })

}

// const estimatedWaitTimeToDate = (years) => {
//     let currentDate = new Date()
//     let newDate = new Date(currentDate);
//     newDate.setMonth(currentDate.getMonth() + 12*years);

//     return newDate
// }

export { getWaitlists, getWaitlistByID, createWaitlist, getWaitlistsByIDs, addUserToWaitlist, removeUserFromWaitlist, getFilteredWaitlist }