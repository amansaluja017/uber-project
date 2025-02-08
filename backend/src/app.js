import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'


const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        Credential: true
    }
));


app.use(express.json({limit: '40kb'}));
app.use(express.urlencoded({extended: true, limit: '40kb'}));
app.use(express.static('public'));
app.use(cookieParser());


import userRoutes from './routes/user.routes.js';
import captionRoutes from './routes/caption.routes.js';

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/caption', captionRoutes);


export {app};