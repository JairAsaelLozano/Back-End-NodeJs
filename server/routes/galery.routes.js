import { Router } from "express";
const $galery_routes = Router();
import * as authCtrl from '../controllers/galery.controllers.js'
import { verifyToken } from "../middlewares/authJwt.js";

$galery_routes.post("/", verifyToken, authCtrl.createGalery)
$galery_routes.get("/", verifyToken, authCtrl.allGaleryByUser)
$galery_routes.get("/all", verifyToken, authCtrl.allGaleries)
$galery_routes.get("/user/:userid", verifyToken, authCtrl.allGaleriesByUserId)
$galery_routes.get("/obtenerGalerias/imagenes/:id", verifyToken, authCtrl.allImgGaleryByUser)
$galery_routes.put("/AddimgToGalery", verifyToken, authCtrl.AddimgToGalery)



export default $galery_routes;