import express from 'express';
import cookieParser from 'cookie-parser';
import {notFound, errorHandler} from './middlewares/error.middleware.js'
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
})


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//routes
import userRoute from './routes/user.routes.js'
import notificationRoute from './routes/notification.routes.js'
import attendanceRoute from './routes/attendance.routes.js'
import CalendarRoute from './routes/calendar.routes.js'
import slipRoute from './routes/slip.route.js'
import siteRoute from './routes/site.route.js'


app.use("/api/v1/users", userRoute)
app.use("/api/v1/notification", notificationRoute)
app.use("/api/v1/attendance", attendanceRoute)
app.use("/api/v1/calendar", CalendarRoute)
app.use("/api/v1/slip", slipRoute)
app.use("/api/v1/site", siteRoute)

app.use(notFound)
app.use(errorHandler)

export {app}