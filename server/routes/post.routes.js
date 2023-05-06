import { Router } from 'express'
const $post_routes = Router()
import PostModel from '../models/posts-models.js'
import {uploadImage} from '../routes/cloudinary.js'
import fs from 'fs-extra'
import * as postCtrl from '../controllers/post.controllers.js'
import {verifyToken} from '../middlewares/index.js'

$post_routes.post('/', verifyToken, postCtrl.createPost)
$post_routes.get('/allposts', postCtrl.getAllPost)
$post_routes.put('/likePost/:id',verifyToken, postCtrl.likePost)
$post_routes.get('/:id', postCtrl.getPostByID)
$post_routes.get('/posts/list/:id', verifyToken, postCtrl.getPostsByList)
$post_routes.delete('/delete/:id',verifyToken, postCtrl.deletepost)
$post_routes.put('/editpost/:id', verifyToken, postCtrl.editPost)


export default $post_routes