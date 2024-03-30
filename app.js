import express from 'express'
import dotenv  from 'dotenv';
import cors  from "cors";
import morgan from  'morgan';
dotenv.config()
const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow requests from this origin
    methods: 'GET,POST',           // Allow these HTTP methods
    allowedHeaders: 'Content-Type', // Allow these headers
}))
app.use(morgan())
app.get('*',(req,res)=>{
    res.send(`<h1>Hello World! From Express Server</h1>`)
})
app.use(express.json())
export default app