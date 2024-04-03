import express, { Router } from 'express'
import dotenv  from 'dotenv';
import cors  from "cors";
import morgan, { format } from  'morgan';
import cookieParser from 'cookie-parser';
import r from './router/authrouter.js';
import cardr from './router/cardrouter.js';
dotenv.config()
const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow requests from this origin
    methods: 'GET,POST',           // Allow these HTTP methods
    allowedHeaders: 'Content-Type', // Allow these headers
}))
app.use(express.json())
app.use(cookieParser());
app.use(morgan(format))
app.use(r);
app.use(cardr);
app.get('*',(req,res)=>{
    res.send(`<h1>Hello World! From Express Server</h1>`)
})
export default app