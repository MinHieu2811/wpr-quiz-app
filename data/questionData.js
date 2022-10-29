import fs from 'fs';

const questionsList = fs.readFile('questions.json', (err, data) => {
    if (err) throw err
    return JSON.parse(data)
});

export default questionsList

