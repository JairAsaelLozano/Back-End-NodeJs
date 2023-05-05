import CategoryModel from '../models/category-models.js'
import PostModel from '../models/posts-models.js'
import UserModel from '../models/users-model.js'

export const getAll = async (req, res) => {

const AllCategorys = await CategoryModel.find().sort({TotalPostsUsing : -1})
if(!AllCategorys) res.json({success:false, message:"no hay categorias"})

// const numeros = [5, 3, 8, 1, 9, 2];

// numeros.sort(function(a, b) {
//   return b - a;
// });


res.json({success: true, AllCategorys})

}
export const getPostsfilters = async (req, res) => {
    
    const regex = "/^(.?(/\b" + req.params.name + "/\b)[^$])$/";

    const AllCategorys = await PostModel.find({ CategoryList : { $regex: new  RegExp("\\b" + req.params.name + "\\b") , $options: 'i' } });
    if (!AllCategorys) res.json({success:false})
    if (AllCategorys) {
        for (var i = 0; i < AllCategorys.length; i++) {
            const UserFound = await UserModel.findById(AllCategorys[i].UserNamePost)
            AllCategorys[i] = {
                UserNickName : UserFound.UserName,
                Src : UserFound.Image.secure_url,
                secure_url : AllCategorys[i].Image.secure_url,
                TitlePost : AllCategorys[i].TitlePost,
                _id : AllCategorys[i]._id
            }
          } 
    }
    
    res.json({success: true, AllCategorys})
    
    }
