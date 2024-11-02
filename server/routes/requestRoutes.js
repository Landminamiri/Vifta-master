import express from 'express'
import { getRequestByID, createRequest, getRequestsByWaitlistId, getPendingRequestsByWaitlistId, approveRequest, rejectRequest } from "../controllers/requestController.js"

const router = express.Router()

router.route('/getRequestsByWaitlistID/:waitlist_id').get(getRequestsByWaitlistId)
router.route('/getPendingRequestsByWaitlistID/:waitlist_id').get(getPendingRequestsByWaitlistId)
router.route('/getRequestByID/:request_id').get(getRequestByID)
router.route('/createRequest').post(createRequest)
router.route('/approveRequest/:request_id/:waitlist_id').put(approveRequest)
router.route('/rejectRequest/:request_id/:waitlist_id').put(rejectRequest)

export default router