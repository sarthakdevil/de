import { Router } from "express";
import {createCard, getcardbyCard_number, getcards, getinstructions} from "../controllers/cards.controller.js"
import isLoggedIn from "../middleware/isloggedin.js";
const  cardr = Router();
cardr.get("/cards",getcards)
cardr.get("/card/:card_number",isLoggedIn,getcardbyCard_number)
cardr.post("/create",isLoggedIn,createCard)
cardr.get("/instructions/:card_number",isLoggedIn,getinstructions)
export  default cardr;