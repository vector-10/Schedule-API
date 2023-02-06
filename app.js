require('dotenv').config(); 
const express                = require('express');
const app                    = express();
const schedule               = require('./Routes/schedule');
const connectDB              = require('./Database/connect');
const notFound               = require('./Middleware/Not-found');
const errorHandlerMiddleware = require('./Middleware/errorHandler');
const authRouter             = require('./Routes/auth');
const scheduleRouter         = require('./Routes/schedule');
const userAuth               = require('./Middleware/authentication');


// app.use(express.static('./public'));
app.use(express.json());

//routes
app.use('/api/v2/auth', authRouter);
app.use('/api/v2/schedule', userAuth, scheduleRouter);
 
//middleware
app.use(notFound);
app.use(errorHandlerMiddleware);



const PORT = process.env.PORT || 4000;


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
start();















