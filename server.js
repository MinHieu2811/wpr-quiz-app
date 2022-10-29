import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connect from './utils/connectDB.js';
import mainRoutes from './route.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config();

connect();

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.get('/' ,(req, res) => {
    res.send('Hello World');
})

app.use('/attempts', mainRoutes)

app.get('/*', function(req, res, next) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
})

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`));