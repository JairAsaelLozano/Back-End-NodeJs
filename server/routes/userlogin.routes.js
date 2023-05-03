import { Router } from 'express'
const $user_routes = Router()
import * as authCtrl from '../controllers/user.controllers.js'
import {checkduplicateUserName} from '../middlewares/verifySignup.js'
import {verifyToken} from '../middlewares/index.js'

$user_routes.post('/login', authCtrl.signin)
$user_routes.post('/Register', checkduplicateUserName , authCtrl.signup)
$user_routes.post('/perfil', verifyToken , authCtrl.perfil)
$user_routes.get('/perfil/:id', authCtrl.perfilVisit)
$user_routes.get('/users/:name' , authCtrl.getUsersfilters)
$user_routes.post('/getonlyperfil', verifyToken , authCtrl.onlyperfil)
$user_routes.put('/editperfil', verifyToken , authCtrl.editperfil)
$user_routes.put('/cambiarcontrasena', verifyToken , authCtrl.editpassword)
$user_routes.get('/islogin', verifyToken, authCtrl.islogin)

export default $user_routes