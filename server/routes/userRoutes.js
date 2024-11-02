import express from 'express'
import { getUser, getUserWaitlists, addWaitlist, removeWaitlist, approveWaitlist, rejectWaitlist } from "../controllers/userController.js"

const router = express.Router()

router.route('/getUser').get(getUser)
router.route('/getUserWaitlists/:user_id').get(getUserWaitlists)
router.route('/addWaitlist/:user_id/:waitlist_id/:request_id').put(addWaitlist)
router.route('/removeWaitlist/:user_id/:waitlist_id/:request_id').put(removeWaitlist)
router.route('/approveRequest/:user_id/:waitlist_id/:request_id').put(approveWaitlist)
router.route('/rejectRequest/:user_id/:waitlist_id/:request_id').put(rejectWaitlist)

export default router