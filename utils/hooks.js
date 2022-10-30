import Question from "../model/question.js"

const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const genArrNumber = (max, size) => {
    const ranArr = []
    if (!size || size === 0) {
        return
    }

    do {
        const randomNumber = randomIntFromInterval(0, max)

        if (!ranArr.includes(randomNumber)) { ranArr.push(randomNumber) }
    } while (ranArr.length < size)

    return ranArr

}

export const getRandomQuestions = (max, size, arr) => {
    const randomArr = []
    for (const ele of genArrNumber(max, size)) {
        randomArr.push(arr[ele])
    }

    return randomArr
}

export const checkUserAnswer = async (usersAnswer) => {
    let res = []
    for (const [key, value] of Object.entries(usersAnswer)) {
        const question = await Question.findById(key)
        if (value === question.correctAnswer) {
            res = [...res, question]
        }
    }

    return res;
}

export const handleScoreText = (score) => {
    if (score < 5) return "Practice more to improve it :D"
    if (score >= 5 && score < 7) return "Good, keep up!"
    if (score >= 7 && score < 9) return "Well done!"
    if (score >= 9 && score <= 10) return "Perfect"
    else return ""
}