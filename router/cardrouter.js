import { Router } from "express";
import {create, getcards} from "../controllers/cards.controller.js"
const  cardr = Router();
cardr.post("/cards",getcards)
cardr.post("/create",create)
export  default cardr;