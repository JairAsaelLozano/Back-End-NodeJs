import { Router } from "express";
const $category_routes = Router();
import ComentsModel from "../models/coments-models.js";
import UserModel from "../models/users-model.js"
import CategoryModel from "../models/category-models.js"
import * as authCtrl from '../controllers/category.controllers.js'

$category_routes.get("/", authCtrl.getAll)
$category_routes.get("/:name", authCtrl.getPostsfilters)


export default $category_routes;