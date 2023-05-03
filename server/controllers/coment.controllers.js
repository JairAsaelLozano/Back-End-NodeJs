import PostModel from '../models/posts-models.js'
import UserModel from '../models/users-model.js'
import ComentsModel from '../models/coments-models.js'

import { uploadImage } from '../routes/cloudinary.js'
import fs from 'fs-extra'
import jwt from 'jsonwebtoken'

export const createComent = async (req, res) => {
  console.log("1")
  const comentUser = {
    UserOwner: req.userId,
    Content: req.body.content,
    DateComment: Date.now(),
    UserNickName: "Usuario de WEB2",
    Src: "https://static.vecteezy.com/system/resources/previews/005/276/776/original/logo-icon-person-on-white-background-free-vector.jpg"
  }

  const model = {
    PostOrigin: req.body.id_post,
    comments: comentUser
  }

  const Comments = await ComentsModel.findOne({ PostOrigin: req.body.id_post })
  if (!Comments) {
    console.log("2")
    ComentsModel(model).save()
    res.json({ success: true })
  }
  if (Comments) {
    console.log("3")
    await ComentsModel.updateOne({ PostOrigin: req.body.id_post }, { $push: { comments: comentUser } })
    res.json({ success: true })
  }
}

export const obtenerComentarios = async (req, res) => {
  const Comments = await ComentsModel.findOne({ PostOrigin: req.params.id })
 
  if (Comments) {
    for (var i = 0; i < Comments.comments.length; i++) {
      const UserFound = await UserModel.findById(Comments.comments[i].UserOwner)
      Comments.comments[i].UserNickName = UserFound.UserName
      Comments.comments[i].Src = UserFound.Image.secure_url


    } 

    res.json({ success: true, Comments })
  

  }
  if (!Comments) {

    res.json({ success: false })
  }


}
