import express from 'express'
import { getBreeder, createBreeder, getWaitlists, addWaitlistID} from "../controllers/breederController.js"

const router = express.Router()

router.route('/getBreederById/:breeder_id').get(getBreeder)
router.route('/createBreeder').post(createBreeder)
router.route('/getWaitlists/:breeder_id').get(getWaitlists)
router.route('/addWaitlistID/:breeder_id/:waitlist_id').post(addWaitlistID)

// router.route('/approveRequest/:request_id/:waitlist_id').put(approveRequest)
// router.route('/rejectRequest/:request_id/:waitlist_id').put(rejectRequest)

export default router