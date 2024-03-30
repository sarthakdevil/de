import { Router } from "express";
import {getcards} from "../controllers/cards.controller.js"
const  cardr = Router();
cardr.post("/cards",getcards)