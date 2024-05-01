import express from 'express'
import { testController } from '../Controllers/testController.js';

//router object
const router = express.Router()

//routes
router.get('/test',testController)

//export
export default router