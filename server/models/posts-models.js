import { mongoose } from 'mongoose'

const { Schema } = mongoose

const PostSchema = new Schema({
  UserNamePost: {
    type: String,
    required: true
  },
  TitlePost: {
    type: String,
    required: true
  },
  CategoryList: {
    type: String,
    required: true
  },
  DescriptionPost: {
    type: String,
    required: true
  },
  StatePost: {
    type: Boolean,
    required: true
  },
  DatePost: {
    type: Date,
    required: true
  },
  VisitsPost: {
    type: Number,
    required: true
  },
  LikesPost: {
    type: Number,
    required: true
  },
  TotalSavesList: {
    type: Number,
    required: true
  },
  Image: {
    public_id: String,
    secure_url: String
  }
})

const PostModel = mongoose.model('posts', PostSchema)

export default PostModel