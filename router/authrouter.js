import { Router } from "express";
import { answer, login,logout} from "../controllers/auth.controller.js";
import isLoggedIn from "../middleware/isloggedin.js";
import { questionalreadycompleted } from "../middleware/isquestioncompleted.js";

const r = Router()
r.post("/login",login)
r.get("/logout",isLoggedIn,logout)
r.put("/submit",isLoggedIn,questionalreadycompleted,answer)

export  default r;