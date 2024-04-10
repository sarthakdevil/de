import { Router } from "express";
import {createCard, getcardbyCard_number, getcards, getinstructions} from "../controllers/cards.controller.js"
import isLoggedIn from "../middleware/isloggedin.js";
import { ispreviouscompleted } from "../middleware/ispreviouscompleted.js";
const  cardr = Router();
cardr.get("/cards",getcards)
cardr.get("/card/:card_number",isLoggedIn,ispreviouscompleted,getcardbyCard_number)
cardr.post("/create",isLoggedIn,createCard)
cardr.get("/instructions",getinstructions)
export  default cardr;