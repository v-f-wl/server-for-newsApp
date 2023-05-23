import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModal from '../models/User.js'


export const register = async(req, res) => {
  console.log(req.body)
  try{
    const password   = req.body.password
    const salt = await bcrypt.genSalt(11)

    const hash = await bcrypt.hash(password, salt)

    const doc = new UserModal({
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash: hash
    })
    const user = await doc.save()

    const token = jwt.sign({
      _id: user._id
    }, 
      'secret123',
      {
        expiresIn: '30d'
      }
    )

    const {passwordHash, ...userData} = user._doc

    res.json({
      ...userData,
      token
    })
  }catch(error){
    console.log(error)
    res.status(500).json({
      message: 'Не удалось зарегестироваться'
    })
  }
}

export const login = async(req, res) => {
  try{
    const user = await UserModal.findOne({ email: req.body.email})

    if(!user){
      return res.status(404).json({
        message: 'Пользователь не найден'
      })
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash)

    if(!isValidPassword){
      return res.status(409).json({
        message: 'Неверный логин или пароль'
      })
    }

    const token = jwt.sign({
      _id: user._id
    }, 
      'secret123',
      {
        expiresIn: '30d'
      }
    )

    const {passwordHash, ...userData} = user._doc

    res.json({
      ...userData,
      token
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      message: 'Не удалось авторизоваться'
    })
  }
}

export const getMe = async (req, res) => {
  try{

    const user = await UserModal.findById(req.userId)

    if(!user){
      return res.status(404).json({
        message: 'Пользователь не найдем'
      })
    }
    const {passwordHash, ...userData} = user._doc

    res.json({
      ...userData
    })
  }catch(error){
    console.log(error)
    res.status(500).json({
      message: 'Нет доступа'
    })
  }
}