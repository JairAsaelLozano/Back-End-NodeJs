
import ListModel from '../models/lists-models.js'
import UserModel from '../models/users-model.js'
export const createList = async (req, res) => {
  console.log("aqui estoy llegando")
  const newList = {
    ListName: req.body.listname,
    ListOwner: req.userId,
    ListPostStored: [],
    PublicList: 1
  }
  await ListModel(newList).save()
  res.json({ success: true })
}

export const addPost = async (req, res) => {
  console.log("llegue al addPost")
  console.log(req.body)
  const updateList = {
    SrcId: req.body.SrcId,
    PostId: req.body.PostId,
    PostDescription: req.body.PostDescription,
    UserNickName: "Usuario de pagina",
    Src: "imagen prueba"
  }
  const updated = await ListModel.updateOne({ _id: req.body.ListId }, { $push: { ListPostStored: updateList } })
  if (!updated) res.json({ success: false })

  res.json({ success: true })
}

export const allListsByUser = async (req, res) => {

  const ListsFound = await ListModel.find({ ListOwner: req.userId })
  if (!ListsFound || ListsFound == null) res.json({ success: false })

  if (ListsFound.length >= 1) {
    for (var i = 0; i < ListsFound.length; i++) {
      for (var j = 0; j < ListsFound[i].ListPostStored.length; j++) {
        const UserFound = await UserModel.findById(ListsFound[i].ListOwner)

        ListsFound[i].ListPostStored[j].UserNickName = UserFound.UserName,
        ListsFound[i].ListPostStored[j].Src = UserFound.Image.secure_url

      }
    }
    res.json({ success: true, ListsFound })
  } else {
    res.json({ success: false })
  }
}


export const deleteList = async (req, res) => { 

    const UserFound = await UserModel.findById(req.userId)
    const userlist = await ListModel.findById(req.params.id)
    if (!userlist) res.json({ success: false })

    await ListModel(userlist).deleteOne({ _id: userlist._id })
   
    res.json({ success: true})

}
