import { ObjectId } from "mongodb";
import { StatusCodes } from 'http-status-codes';

import User from "../models/User.js";
import Waitlist from "../models/Waitlist.js";

const getUser = async (req, res) => {
    const userID = req.body.user_id;
    const objectuserID = new ObjectId(userID)

    const user = await User.findOne(
        { _id:objectuserID }
    )
    
    res.status(StatusCodes.OK).json(user);
}


const getUserWaitlists = async (req, res) => {
    const userID = req.params.user_id
    const objectuserID = new ObjectId(userID)
    console.log("UserID: "+userID)

    await User.findOne(
        { _id:objectuserID }
    ).then((user) => {
        
        const userWaitlists = user.waitlists

        res.status(StatusCodes.OK).json(userWaitlists);
    })
}

const addWaitlist = async (req, res) => {
    const waitlist_id = req.params.waitlist_id
    const user_id = req.params.user_id
    const request_id = req.params.request_id
    
    const objectUserID = new ObjectId(user_id)
    const objectWaitlistID =  new ObjectId(waitlist_id)

    const waitlist = await Waitlist.findOne(
        { _id: objectWaitlistID }
    )

    let waitlistObject = {}

    waitlistObject = {
        status: "Pending Approval", // differently styled messages 
        // deposit_amount: waitlist.deposit_amount
        dateOfLastConfirmation: "date",
        deposit_paid: false,
        price_at_join: waitlist.price,
        breed_type: waitlist.breed_type,
        province: waitlist.province,
        city: waitlist.location.city,
        availability: waitlist.availability
        
    }

    User.updateOne(
        { _id: objectUserID },
        {  $set: { [`waitlists.${waitlist_id}.${request_id}`]: waitlistObject} }
    ).then( (result) => {
        res.send(result);
    })
}

const approveWaitlist = (req, res) => {
    const waitlist_id = req.params.waitlist_id
    const user_id = req.params.user_id
    const request_id = req.params.request_id

    const objectUserID = new ObjectId(user_id)

    console.log("User ID: " + user_id)
    console.log("Waitlist ID: " + waitlist_id)
    console.log("Request ID: " + request_id)

    User.updateOne(
        { _id: objectUserID },
        {  $set: { [`waitlists.${waitlist_id}.${request_id}.status`]: "Approved"} }
    ).then( (result) => {
        console.log(result)
        res.send(result);
    })
}

const rejectWaitlist = (req, res) => {
    const waitlist_id = req.params.waitlist_id
    const user_id = req.params.user_id
    const request_id = req.params.request_id

    const objectUserID = new ObjectId(user_id)

    console.log("User ID: " + user_id)
    console.log("Waitlist ID: " + waitlist_id)
    console.log("Request ID: " + request_id)

    User.updateOne(
        { _id: objectUserID },
        {  $set: { [`waitlists.${waitlist_id}.${request_id}.status`]: "Rejected"} }
    ).then( (result) => {
        console.log(result)
        res.send(result);
    })
}

const removeWaitlist = async (req, res) => {
    const user_id = req.params.user_id;
    const waitlist_id = req.params.waitlist_id;
    const request_id = req.params.request_id;
    
    const objectUserID = new ObjectId(user_id)

    User.updateOne(
        { _id: objectUserID },
        {  $unset: { [`waitlists.${waitlist_id}.${request_id}`]: 1} }
    ).then( (result) => {
        res.send(result);
    })
}


export { getUser, getUserWaitlists, addWaitlist, removeWaitlist, approveWaitlist, rejectWaitlist }