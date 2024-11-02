import { ObjectId } from "mongodb";
import { StatusCodes } from 'http-status-codes';

import Breeder from "../models/Breeder.js";
import Request from "../models/Request.js";

const getBreeder = async (req, res) => {
    const breeder_id = req.body.breeder_id;
    const objectBreederID = new ObjectId(breeder_id)

    const breeder = await Breeder.findOne(
        { _id: objectBreederID }
    )
    
    res.status(StatusCodes.OK).json(breeder);
}

const createBreeder = async (req, res) => {
    const formData = req.body

    const breeder_name = formData.breeder_name

    const breeder = {
        breeder_name: breeder_name
    }

    Breeder.create(breeder).then( (result) => {
        res.send(result)
    })
}

const addDogs = async (req, res) => {
    const formData = req.body
    const breeder_id = req.params.breeder_id
    
    const breeder_id_Object = new ObjectId(breeder_id)

    Breeder.updateOne(
        { _id: breeder_id_Object },
        { $push: {dogs: formData}}
    ).then( (result)  => {
            res.status(StatusCodes.OK).json(result);
        }
    )


}

const getWaitlists = async (req, res) => {
    const breeder_id = req.params.breeder_id;
    const objectBreederID = new ObjectId(breeder_id)

    const breeder = await Breeder.findOne(
        { _id: objectBreederID }
    )
    console.log(breeder)
    
    res.status(StatusCodes.OK).json(breeder);
}

const addWaitlistID = async (req, res) => {
    const breeder_id = req.params.breeder_id;
    const objectBreederID = new ObjectId(breeder_id)

    const waitlist_id = req.params.waitlist_id;

    Breeder.updateOne(
        { _id: objectBreederID },
        { $push: { waitlist_ids: waitlist_id } }
    ).then( (result) => {
        res.send(result)
    })

}

// const approveRequest = async (req, res) => {
//     const request_id = req.params.request_id;
//     const objectRequestID = new ObjectId(request_id)
    
//     Request.updateOne(
//         { _id: objectRequestID },
//         { status: "Approved" }
//     ).then( (result) => {
//         res.send(result);
//     })


// }

// const rejectRequest = async (req, res) => {
//     const request_id = req.params.request_id;
//     const objectRequestID = new ObjectId(request_id)

//     Request.updateOne(
//         { _id: objectRequestID},
//         { status: "Rejected" }
//     ).then( (result) => {
//         res.send(result);
//     })
// }

export { getBreeder, createBreeder, getWaitlists, addWaitlistID, addDogs }