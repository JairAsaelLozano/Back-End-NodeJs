import {mongoose} from 'mongoose'

const {Schema} = mongoose

const GalerySchema = new Schema({
    GaleryOwner: {
        type : String,
        required: true
    },
    GaleryName: {
        type : String,
        required: true
    },
    Images: {
        type : Array,
        required: true
    }
})

const GaleryModel = mongoose.model('galeries', GalerySchema)

export default GaleryModel