import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name : 'dbipw9nuw',
    api_key: '641194224186714',
    api_secret :'Ks6I6uPjC6gCVebwR8W8fr9dBcw',
    secure: true
})

export async function uploadImage(filePath){
    return await cloudinary.uploader.upload(filePath, {folder : 'replit'})
}