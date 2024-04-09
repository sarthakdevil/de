import { Router } from "express";
import {createCard, getcardbyCard_number, getcards} from "../controllers/cards.controller.js"
import isLoggedIn from "../middleware/isloggedin.js";
const  cardr = Router();
cardr.post("/cards",getcards)
cardr.get("/card",getcardbyCard_number)
cardr.post("/create",isLoggedIn,createCard)
export  default cardr;