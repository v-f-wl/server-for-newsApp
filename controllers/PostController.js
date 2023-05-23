import PostModel from '../models/Post.js'


export const getAll = async (reg, res) => {
  try {
    // для того, чтобы в постах был референс на юзера
    const posrs = await PostModel.find().populate('user').exec()

    res.json(posrs)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось получить посты'
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id

    PostModel.findOneAndUpdate(
    {
      _id: postId
    }, 
    {
      $inc: { viewsCount: 1}
    }, 
    {
      returnDocument: 'after'
    }
    )
    .then(updatedDocument => {
      if(!updatedDocument){
        return res.status(404).json({
          message: 'Статья не найдена'
        })
      }
      res.json(updatedDocument)
    })
    .catch(error => {
      console.log(error)
      return res.status(404).json({
        message: 'Статья не найдена'
      })
    });
  } catch (error) {
    console.log(error)
    res.status(404).json({
      message: 'Не удалось получить пост'
    })
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id
    PostModel.findOneAndDelete(
      {
        _id: postId
      }
    )
    .then( (doc) => {
      if(!doc){
        return res.status(404).json({
          message: "Статья не найдена"
        })
      }

      res.json({
        message: 'Succec'
      })
    })
    .catch(err => {
      res.status(404).json({
        message: "Проблемы"
      })
    })

  } catch (error) {
    console.log(error)
    res.status(404).json({
      message: 'Не удалось удалить пост'
    })
  }
}


export const create = async (req, res) => {
  try{
    const doc = new PostModel({
      text: req.body.text,
      user: req.userId
    })

    const post = await doc.save()
    res.json(post)
  }catch(error){
    console.log(error)
    res.status(500).json({
      message: 'Не удалось создать пост'
    })
  }
}

export const update = async (req, res) => {
  try{
    const postId = req.params.id

    await PostModel.updateOne({
      _id: postId
    },
    {
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId
    }
    )

    res.json({
      succec: true
    })
  }catch(error){
    console.log(error)
    res.status(500).json({
      message: 'Не удавлось обновить статью'
    })
  }
}