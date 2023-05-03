import {mongoose} from 'mongoose'

const {Schema} = mongoose

const CommentSchema = new Schema({
    PostOrigin: {
        type : String,
        required: true
    },
    comments: {
        type : Array,
        required: true
    }
    // ,
    // UserOwner:{
    //     type : String,
    //     required: true
    // },
    // Content: {
    //     type : String,
    //     required: true
    // },
    // DateComment: {
    //     type : Date,
    //     required: true
    // }
})

const ComentsModel = mongoose.model('comments', CommentSchema)

export default ComentsModel