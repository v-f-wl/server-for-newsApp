import express from 'express'
import cors from "cors"
import mongoose from 'mongoose'
import handleErrors from './handleErrors.js'
import { registerValidator, loginValidator, postCreateValidation} from './validations.js'
import {PostController, UserController} from './controllers/index.js'
import checkAuth from './utils/checkAuth.js'
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8000
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log('DB Okay')
  })
  .catch(() => console.log('DB Error'))

const app = express()
app.use(express.json());
app.use(cors())



app.post('/auth/login',loginValidator, handleErrors,UserController.login)
app.post('/auth/register',registerValidator,handleErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)


app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.delete('/posts/:id',checkAuth, PostController.remove)
app.post('/posts', checkAuth, postCreateValidation,handleErrors, PostController.create)
app.patch('/posts/:id',checkAuth,postCreateValidation,handleErrors, PostController.update)



app.listen(PORT, (err) =>{
  console.log(`server start on ${process.env.PORT}`)
  if(err){
    return console.log(err)
  }

  console.log('Server Ok')
})