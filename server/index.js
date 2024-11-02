import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import MongoosConnection from "./db/connect.js";
import waitlistRouter from "./routes/waitlistRoutes.js"
import userRouter from "./routes/userRoutes.js"
import breedRouter from "./routes/breederRoutes.js"
import requestRouter from "./routes/requestRoutes.js"
import authRouter from "./routes/authRoutes.js"
import path from "path"


import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const currentModuleURL = new URL(import.meta.url);
const currentModulePath = fileURLToPath(currentModuleURL);
const currentDir = dirname(currentModulePath);

const app = express();
dotenv.config();

//to show the requests in the console
// if(process.env.NODE_ENV !== 'production'){
//     app.use(morgan('dev'));
// }


//local
const corsOpts = {
    origin: '*',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
};

//online
// const corsOpts = {
//     origin: 'https://vifta-mvp-9818ad49d787.herokuapp.com',
// };

app.use(cors(corsOpts));
// app.use(express.static(join(currentDir, '..', 'client', 'build')));
app.use(express.json());

app.use('/controller/waitlist', waitlistRouter);
app.use('/controller/user', userRouter);
app.use('/controller/breeder', breedRouter);
app.use('/controller/request', requestRouter);
app.use('/controller/auth', authRouter);

// app.get('/', (req, res) => {
//     res.json({msg:"Works!"})
// })

// Serve the static files from the React app

// Handle any other routes by serving the React app
// app.get('*', (req, res) => {
//     res.sendFile(join(currentDir, '..', 'client', 'build', 'index.html'));
// });



const port = process.env.PORT || 5000;
const host = '0.0.0.0';

const start = async () => {
    try {
        // connecting to the cloud mongodb
        await MongoosConnection(process.env.MONGO_URL, "Vifta"); 
        
        app.listen(port, host, () => console.log(`Server is listening on port ${port}...`));

    } catch (err) {
        console.log(err);
    }
}

start();