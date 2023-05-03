import {mongoose} from 'mongoose'

const {Schema} = mongoose

const ListSchema = new Schema({
    ListName: {
        type : String,
        required: true
    },
    ListOwner: {
        type : String,
        required: true
    },
    ListPostStored: {
        type : Array,
    },
    PublicList: {
        type : Boolean,
        required: true
    }
})

const ListModel = mongoose.model('lists', ListSchema)

export default ListModel