import asyncHandler from 'express-async-handler'
import Question from '../model/question.js'
import Attempt from '../model/attempts.js'
import { getRandomQuestions } from '../utils/hooks.js'

// @desc - Create an attempt
// @route - POST /api/attempt

const createAttempt = asyncHandler(async (req, res) => {
    const questions = await Question.find({})
    console.log(questions)
    const questionsRandomArr = getRandomQuestions(14, questions)
    const newAttempt = new Attempt({
        questions: questionsRandomArr,
        startedAt: new Date(),
        score: 0,
        usersAnswer: [],
        scoreText: '',
        completed: false
    })

    if(newAttempt) {
        res.status(201)
        res.json(newAttempt)
    } else {
        res.status(404)
        throw new Error('Can not create attempt')
    }
})

const updateAttempt = asyncHandler(async (req, res) => {
    const { id, usersAnswer } = req.params

    const attempt = await Attempt.findById(id)

    const { questions } = attempt

})

export {
    createAttempt,
    updateAttempt
}