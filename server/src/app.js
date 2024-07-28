import express from 'express';
import cookieParser from 'cookie-parser';
import {notFound, errorHandler} from './middlewares/error.middleware.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//routes
import userRoute from './routes/user.routes.js'

app.use("/api/v1/users", userRoute)

app.use(notFound)
app.use(errorHandler)

export {app}