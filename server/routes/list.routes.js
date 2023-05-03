import { Router } from 'express'
const $list_routes = Router()
import * as authCtrl from '../controllers/list.controllers.js'
import {verifyToken} from '../middlewares/index.js'

$list_routes.post('/', verifyToken ,authCtrl.createList)
$list_routes.put('/addPost',verifyToken , authCtrl.addPost)
$list_routes.get('/user/Lists', verifyToken, authCtrl.allListsByUser)
$list_routes.delete('/user/deleteLists/:id', verifyToken, authCtrl.deleteList)

export default $list_routes