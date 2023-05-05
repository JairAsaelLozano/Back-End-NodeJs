import { mongoose } from 'mongoose'
import bcrypt from 'bcryptjs'

const { Schema } = mongoose

const UserSchema = new Schema({
    UserName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    FullName: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Image: {
        public_id: String,
        secure_url: String
    },
    description:{
        type: String,
        required: true
    },
    PostCounts:{
        type: Number,
        required: true
    }
},
{
    timestamps: true,
    versionkey: false,
})

UserSchema.statics.encryptPassword = async (password) => {

const salt = await bcrypt.genSalt(10)

return await bcrypt.hash(password, await bcrypt.genSalt(10))
}
UserSchema.statics.comparePassword = async (password, receivedPassword) => {
return await bcrypt.compare(password,receivedPassword)
}

const UserModel = mongoose.model('users', UserSchema)

export default UserModel