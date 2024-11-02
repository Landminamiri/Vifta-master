import { ObjectId } from "mongodb";
import { StatusCodes } from 'http-status-codes';
import Waitlist from "../models/Waitlist.js"
import Request from "../models/Request.js"

const getRequestByID = async (req, res) => {
    const request_id = req.params.request_id
    const request_id_object = new ObjectId(request_id)
    
    Request.findOne(
        { _id: request_id_object }
    ).then((request) => {
        res.json(request)
    })
}

const createRequest = async (req, res) => {
    const user_id = req.body.user_id
    const waitlist_id = req.body.waitlist_id
    const user_name = req.body.user_name
    const city = req.body.city
    const province = req.body.province
    const contact = req.body.contact
    const questionnaire_answers = req.body.questionnaire_answers
    const breeder_comments = req.body.breeder_comments
    const message = req.body.message

    const user_id_object = new ObjectId(user_id)
    const waitlist_id_object = new ObjectId(waitlist_id)

    const object_to_push = {
        user_id: user_id_object,
        waitlist_id: waitlist_id_object,
        user_name: user_name,
        city: city,
        province: province,
        contact: contact,
        questionnaire_answers: questionnaire_answers,
        breeder_comments: breeder_comments,
        status: 'Pending',
        message: message
    }

    Request.create(object_to_push).then( (result) => {
        console.log(result)
        res.send(result)
    })
}

const getRequestsByWaitlistId = async (req, res) => {
    const waitlist_id = req.params.waitlist_id
    const waitlist_id_object = new ObjectId(waitlist_id)
    
    Request.find(
        { waitlist_id: waitlist_id_object }
    ).then((results) => {
        res.json(results)
    })
}



const getPendingRequestsByWaitlistId = async (req, res) => {
    const waitlist_id = req.params.waitlist_id
    const waitlist_id_object = new ObjectId(waitlist_id)
    
    Request.find(
        {
            $and: [{ waitlist_id: waitlist_id_object }, {status: "Pending"}]
        }
    ).then((results) => {
        res.json(results)
    })
}

const getRequestsByUserId = async (req, res) => {
    const user_id = req.params.user_id
    const user_id_object = new ObjectId(user_id)
    
    Request.find(
        { user_id: user_id_object }
    ).then((results) => {
        res.json(results)
    })
}

const approveRequest = async (req, res) => {
    const request_id = req.params.request_id
    const request_id_object = new ObjectId(request_id)

    Request.updateOne(
        { _id: request_id_object },
        { status: 'Approved' }
    ).then((request) => {
        res.json(request)
    })
    
}

const rejectRequest = async (req, res) => {
    const request_id = req.params.request_id
    const request_id_object = new ObjectId(request_id)
    
    Request.updateOne(
        { _id: request_id_object },
        { status: 'Rejected' }
    ).then((request) => {
        res.json(request)
    })
}

export { getRequestByID, createRequest, getRequestsByWaitlistId, getPendingRequestsByWaitlistId, getRequestsByUserId, approveRequest, rejectRequest }