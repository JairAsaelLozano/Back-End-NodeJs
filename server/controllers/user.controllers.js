import UserModel from '../models/users-model.js'
import PostModel from '../models/posts-models.js'
import { uploadImage } from '../routes/cloudinary.js'
import fs from 'fs-extra'
import jwt from 'jsonwebtoken'
// import { LocalStorage } from 'node-localstorage'
// export const localStorage = new LocalStorage('./local-storage')

export const signup = async (req,res) => {
  const {UserName, Email, FullName, Password} = req.body;
  var user_image
   if (req.files?.File) {
    const result = await uploadImage(req.files.File.tempFilePath)
    user_image = {
      public_id: result.public_id,
      secure_url: result.secure_url
    }
    await fs.unlink(req.files.File.tempFilePath)
  }

  const newUser = {
    UserName: UserName ,
    Email: Email ,
    FullName:  FullName ,
    Password: await UserModel.encryptPassword(Password),
    Image : user_image,
    PostCounts : 0 ,
    description: "Hola, soy un artista y algun dia me convertire en el mejor artista del mundo, picasso? me la pela, lopez doriga? tambien me la pela"
  }

   const savedUser = await UserModel(newUser).save().then((data) => res.json(data));

  const token = jwt.sign({id: savedUser._id}, 'secretword', {
    expiresIn:3600
  })


}

export const signin = async (req,res) => {
  console.log( req.body.UserName + " "  + req.body.Password)
  const userFound = await UserModel.findOne({UserName: req.body.UserName})
  if(!userFound) return res.json({message: "user not found"})
  
 const MatchPassword = await UserModel.comparePassword(req.body.Password, userFound.Password)

 if(!MatchPassword) return res.json({token: null, message: 'invalid'})

 const token = jwt.sign({id: userFound._id}, 'secretword', {
  expiresIn:3600
 })

  res.json({'token': token, 'UserName': req.body.UserName,success: true, url: '/home'});

}

export const perfilVisit = async (req,res) => {
  // console.log(req.body.userId)
  const UserFound = await UserModel.findById(req.params.id)
  const UserPosts = await PostModel.find({UserNamePost:req.params.id })
  if(!UserFound) return res.json({message: "user not found"})
  // console.log(req.body.userId)
  // console.log(UserFound)
  const data  = {
    user: UserFound,
    post: UserPosts
  }

  res.json({success:true, data:data})
}


export const perfil = async (req,res) => {
  // console.log(req.body.userId)
  const UserFound = await UserModel.findById(req.userId)
  const UserPosts = await PostModel.find({UserNamePost:req.userId })
  if(!UserFound) return res.json({message: "user not found"})
  // console.log(req.body.userId)
  // console.log(UserFound)
  const data  = {
    user: UserFound,
    post: UserPosts
  }

  res.json({success:true, url:'/profile', data:data})
}

export const getUsersfilters = async (req, res) => {

  
  const AllUser = await UserModel.find({ UserName : { $regex: req.params.name , $options: 'i' } });
  if (!AllUser) res.json({success:false})
 

  res.json({success: true, AllUser})
  


}

export const onlyperfil = async (req,res) => {

  const UserFound = await UserModel.findById(req.userId)
  if(!UserFound) return res.json({message: "user not found"})
  res.json({success:true, url:'/profile', data:UserFound})
  
}

export const editperfil = async (req,res) => {
  console.log(req.body)
  const UserFound = await UserModel.findById(req.userId)
  if(!UserFound) return res.json({message: "user not found"})
  
  var UpdatedUser  = {
    UserName: req.body.UserName ,
    Email: req.body.Email ,
    FullName:  req.body.FullName ,
    description: req.body.description
  }

  var user_image
   if (req.files?.File) {
    const result = await uploadImage(req.files.File.tempFilePath)
    user_image = {
      public_id: result.public_id,
      secure_url: result.secure_url
    }
    await fs.unlink(req.files.File.tempFilePath)
     UpdatedUser  = {
      UserName: req.body.UserName ,
      Email: req.body.Email ,
      FullName:  req.body.FullName ,
      description: req.body.description,
      Image: user_image
    }
  }
 

  await UserModel.findOneAndUpdate({_id : req.userId}, {$set: UpdatedUser})
  res.json({success:true, url:'/profile'})


}

export const editpassword = async (req,res) => {
  // console.log(req.body.userId)
  const UserFound = await UserModel.findById(req.userId)
  if(!UserFound) return res.json({message: "user not found"})
  const MatchPassword = await UserModel.comparePassword(req.body.OldPassword, UserFound.Password)

 if(!MatchPassword) return res.json({message: 'La contraseña anterior no es correcta'})
  
  var UpdatedUser  = {
    Password: await UserModel.encryptPassword(req.body.NewPassword),
  }

  await UserModel.findOneAndUpdate({_id : req.userId}, {$set: UpdatedUser})
  res.json({success:true, url:'/profile'})

}

export const islogin = async (req, res) => {
  console.log("a")
  res.json({success:true})

}