import {mongoose} from 'mongoose'

const {Schema} = mongoose

const GroupSchema = new Schema({
    IdGroup: {
        type : String,
        required: true
    },
    GroupName: {
        type : String,
        required: true
    },
    ListMembers: {
        type : String,
        required: true
    },
    ListPosts: {
        type : String,
        required: true
    }
})

const GroupModel = mongoose.model('groups', GroupSchema)

export default GroupModel