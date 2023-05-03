import { Router } from "express";
const $coments_routes = Router();
import ComentsModel from "../models/coments-models.js";
import UserModel from "../models/users-model.js"
import {verifyToken} from '../middlewares/index.js'
import * as authCtrl from '../controllers/coment.controllers.js'

$coments_routes.post("/", verifyToken , authCtrl.createComent)
$coments_routes.get("/getcoments/:id" , authCtrl.obtenerComentarios)

export default $coments_routes;
