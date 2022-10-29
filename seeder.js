import dotenv from 'dotenv'
import Question from './model/question.js'
import questionsList from './data/questionData.js' 
import connect from './utils/connectDB.js'

dotenv.config();

connect();

const importData = async () => {
    try{
        await Question.deleteMany();
        await Question.insertMany(questionsList);
        
        console.log('Data Imported...');
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

const destroyData = async () => {
    try{
        await Question.deleteMany();

        console.log('Data Destroyed...');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

if(process.argv[2] === '-d') {
    destroyData();
}else{
    importData();
}