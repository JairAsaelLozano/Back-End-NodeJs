
import GaleryModel from '../models/galery-models.js'
import { uploadImage } from '../routes/cloudinary.js'
import fs from 'fs-extra'
export const createGalery = async (req, res) => {
    console.log(req.body.GaleryName)
    const newGalery = {
        GaleryOwner: req.userId,
        GaleryName: req.body.GaleryName,
        Images: []
    }
    await GaleryModel(newGalery).save()
    res.json({ success: true })

}

export const allGaleryByUser = async (req, res) => {

    const GaleryFound = await GaleryModel.find({ GaleryOwner: req.userId })

    if (!GaleryFound || GaleryFound == null) res.json({ success: false })
    
    // const array = GaleryFound[0].Images.slice(GaleryFound.Images.length-4)
    

    res.json({ success: true, GaleryFound })
}

export const allGaleries = async (req, res) => {

  const GaleryFound = await GaleryModel.find()

  if (!GaleryFound || GaleryFound == null) res.json({ success: false })

  res.json({ success: true, GaleryFound })
}

export const allGaleriesByUserId = async (req, res) => {

  const GaleryFound = await GaleryModel.find({GaleryOwner: req.params.userid})

  if (!GaleryFound || GaleryFound == null) res.json({ success: false })

  res.json({ success: true, GaleryFound })
}

export const allImgGaleryByUser = async (req, res) => {

    const GaleryFound = await GaleryModel.find({ _id : req.params.id})

    if (!GaleryFound || GaleryFound == null) res.json({ success: false })

    res.json({ success: true, GaleryFound })
}

export const AddimgToGalery = async (req, res) => {

    console.log("llegue al AddimgToGalery")
    console.log(req.body)

    var updateGalery
    if (req.files?.File) {
        console.log("estoy entrando a el proceso de file")
     const result = await uploadImage(req.files.File.tempFilePath)
     updateGalery = {
       secure_url: result.secure_url,
       ImgOwner: req.userId,
     }
     await fs.unlink(req.files.File.tempFilePath)
     
   }

    const updated = await GaleryModel.updateOne({ _id: req.body.GaleryId }, { $push: { Images: updateGalery } })
    if (!updated) res.json({ success: false })
  
    res.json({ success: true })

}
