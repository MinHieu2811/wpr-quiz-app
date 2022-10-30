import asyncHandler from 'express-async-handler'
import Question from '../model/question.js'
import Attempt from '../model/attempts.js'
import { checkUserAnswer, getRandomQuestions, handleScoreText } from '../utils/hooks.js'

// @desc - Create an attempt
// @route - POST /api/attempt

const createAttempt = asyncHandler(async (req, res) => {
    const questions = await Question.find({})
    const questionsRandomArr = getRandomQuestions(14, 10, questions)
    const newAttempt = new Attempt({
        questions: questionsRandomArr,
        startedAt: new Date(),
        score: 0,
        usersAnswer: [],
        scoreText: '',
        completed: false
    })

    const attempt = await newAttempt.save()

    if (newAttempt) {
        res.status(201)
        res.json(attempt)
    } else {
        res.status(404)
        throw new Error('Can not create attempt')
    }
})

const updateAttempt = asyncHandler(async (req, res) => {
    const { id } = req.params
    const attempt = await Attempt.findById(id)
    let arrAnswer = []

    if(req.body.usersAnswer) {
        for (const [key, value] of Object.entries(req.body.usersAnswer)) {
            arrAnswer = [...arrAnswer, {
                questionId: key,
                userSelectedAnswerIndex: value
            }]
        }
    }

    const result = await checkUserAnswer(req.body.usersAnswer)

    if (attempt) {
        attempt.score = result.length
        attempt.usersAnswer = arrAnswer
        attempt.correctAnswer = result
        attempt.scoreText = handleScoreText(result.length)
        attempt.completed = true

        const updatedAttempt = await attempt.save();
        res.json(updatedAttempt)
    }

})

export {
    createAttempt,
    updateAttempt
}