import { Router } from "express";
import {create, getcardbyCard_number, getcards} from "../controllers/cards.controller.js"
import { isAdmin } from "../middleware/isadmin.js";
import isLoggedIn from "../middleware/isloggedin.js";
const  cardr = Router();
cardr.post("/cards",getcards)
cardr.get("/card",getcardbyCard_number)
cardr.post("/create",isLoggedIn,isAdmin,create)
export  default cardr;