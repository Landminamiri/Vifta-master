import express from 'express'
import { getWaitlists, getWaitlistByID, getWaitlistsByIDs, createWaitlist, addUserToWaitlist, removeUserFromWaitlist, getFilteredWaitlist } from "../controllers/waitlistController.js"

const router = express.Router()

router.route('/getWaitlists').get(getWaitlists)
router.route('/getWaitlistById/:waitlist_id').get(getWaitlistByID)
router.route('/getWaitlistsByIds').post(getWaitlistsByIDs)

router.route('/createWaitlist').post(createWaitlist)
router.route('/addUserToWaitlist/:waitlist_id/:user_id').put(addUserToWaitlist)
router.route('/removeUserFromWaitlist').put(removeUserFromWaitlist)
router.route('/filterWaitlist').post(getFilteredWaitlist)

export default router