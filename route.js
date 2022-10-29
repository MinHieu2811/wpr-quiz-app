import express from 'express'
import { createAttempt, updateAttempt } from './controllers/attemptController.js';

const router = express.Router();

router.route('/').post(createAttempt)
router.route('/:id').post(updateAttempt)

export default router