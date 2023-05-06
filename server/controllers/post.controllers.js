import PostModel from '../models/posts-models.js'
import UserModel from '../models/users-model.js'
import ListModel from '../models/lists-models.js'

import CategoryModel from '../models/category-models.js'

import { uploadImage } from '../routes/cloudinary.js'
import fs from 'fs-extra'
import jwt from 'jsonwebtoken'

export const createPost = async (req, res) => {
   
    var post_image


    if (req.files?.File) {
      
        const result = await uploadImage(req.files.File.tempFilePath)

        post_image = {
            public_id: result.public_id,
            secure_url: result.secure_url
        }

        await fs.unlink(req.files.File.tempFilePath)
    }

    const postUser = {
        UserNamePost: req.userId,
        TitlePost: req.body.TitlePost,
        CategoryList: req.body.CategoryList,
        DescriptionPost: req.body.DescriptionPost,
        StatePost: true,
        DatePost: Date.now(),
        VisitsPost: 0,
        LikesPost: 0,
        TotalSavesList: 0,
        Image: post_image,
        Likes: []
    }

    let str = req.body.CategoryList
    let arr = str.split(',')


    for (var i = 0; i < arr.length; i++) {
        const category = {
            CategoryName: arr[i],
            TotalPostsUsing: 1,
        }
        try {
      
            
            const existingCategory = await CategoryModel.findOne({ CategoryName: category.CategoryName });
            if (existingCategory) {
                await CategoryModel.findOneAndUpdate({ CategoryName: category.CategoryName }, { $inc: { TotalPostsUsing: 1 } });
            }
            else {
                await CategoryModel.create(category);
            }
        } catch (error) {
      
        }



    }

    await PostModel(postUser).save()
    await UserModel.findOneAndUpdate({ _id: req.userId }, { $inc: { PostCounts: 1 } })
    res.json({ success: true, url: '/home' })
}

export const getAllPost = async (req, res) => {

    const Posts = await PostModel.find()
    const PostsFound = await Posts.reverse()
    res.json({ PostsFound })
}

export const getPostByID = async (req, res) => {

    const PostFound = await PostModel.findById(req.params.id)
    const UserFound = await UserModel.findById(PostFound.UserNamePost)
    const respuesta = {
        Post: PostFound,
        User: UserFound
    }
    res.json({ respuesta })
}

export const getPostsByList = async (req, res) => {
    const listId = req.params.id
    //obtener lista de posts para poder obtener los posts guardados
    const ListFound = await ListModel.findById(listId)

    if (!ListFound) { res.json({ success: false }) }
    const Posts = ListFound.ListPostStored

    res.json({ success: true, Posts })
}

export const deletepost = async (req, res) => {
    const UserFound = await UserModel.findById(req.userId)
    if (!UserFound) res.json({ success: false })
    const userpost = await PostModel.findById(req.params.id)
    if (!userpost) res.json({ success: false })


    let str = userpost.CategoryList
    let arr = str.split(',')


    for (var i = 0; i < arr.length; i++) {
        const category = {
            CategoryName: arr[i],
            TotalPostsUsing: 1,
        }
        try {
 
            await CategoryModel.create(category);
        } catch (error) {
    
            await CategoryModel.findOneAndUpdate({ CategoryName: category.CategoryName }, { $inc: { TotalPostsUsing: -1 } });
        }

    }

    await PostModel(userpost).deleteOne({ _id: userpost._id })
    await UserModel.findOneAndUpdate({ _id: req.userId }, { $inc: { PostCounts: -1 } })
    res.json({ success: true, url: '/profile' })
}

export const editPost = async (req, res) => {

    const UserFound = await UserModel.findById(req.userId)
    if (!UserFound) { res.json({ success: false }) }
    const userpost = await PostModel.findById(req.params.id)
    if (!userpost) res.json({ success: false })
    if (UserFound._id != userpost.UserNamePost) res.json({ success: false })
    if (UserFound._id == userpost.UserNamePost) {
        const updatedpost = {
            UserNamePost: req.userId,
            TitlePost: req.body.TitlePost,
            CategoryList: req.body.CategoryList,
            DescriptionPost: req.body.DescriptionPost,
            StatePost: true,
            DatePost: userpost.DatePost,
            VisitsPost: 1,
            LikesPost: 5,
            TotalSavesList: 1,
            Image: userpost.Image
        }
        await PostModel.findOneAndUpdate({ _id: userpost._id }, { $set: updatedpost })
        res.json({ success: true, url: '/profile' })
    }

}


export const likePost = async (req, res) => {

    const UserFound = await UserModel.findById(req.userId)
    if (!UserFound) { res.json({ success: false }) }
   
    const isliked = await PostModel.findOne({ _id: req.params.id_post , Likes: { $elemMatch: req.userId } })
    if(!isliked) {
    await PostModel.findOneAndUpdate({ _id: req.params.id_post }, { $push: {Likes : req.userId }})
    res.json({ success: true, isliked})
    }

    await PostModel.findOneAndUpdate({ _id: req.params.id_post }, { $pull: {Likes : req.userId }})
    res.json({ success: true, isliked})

}