const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getRandomQuestions = (size, arr) => {
    const randomArr = []
    for(let i = 0; i<10; i++) {
        let ranInt = randomIntFromInterval(0, size)
        randomArr.push(arr[ranInt])
    }

    return randomArr
}

const findElementInArray = (ele, arr) => {
    let res = {}
    for (const e of arr) {
        if(ele.questionId === e._id) {
            res = {...e}
        }
    }
    return res
}

export const compareUserAnswer = (usersAnswer, quizAnswer) => {
    
}