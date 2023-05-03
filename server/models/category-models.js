import {mongoose} from 'mongoose'

const {Schema} = mongoose

const CategorySchema = new Schema({
    CategoryName: {
        type : String,
        required: true,
        unique: true
    },
    TotalPostsUsing: {
        type : Number,
    }
})

const CategoryModel = mongoose.model('Categories', CategorySchema)

export default CategoryModel