import { Router } from "express";
import { login, register,logout, isattempted } from "../controllers/auth.controller";
import isLoggedIn from "../middleware/isloggedin";

const r = Router()
r.post("/login",login)
r.post("/logout",isLoggedIn,logout)
r.put("/submit",isloggedin,isattempted)
