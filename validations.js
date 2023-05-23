import { body } from 'express-validator'

export const loginValidator = [
  body('email', 'Неверый формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 цифр').isLength({min: 5})
]

export const registerValidator = [
  body('email', 'Неверый формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 цифр').isLength({min: 5}),
  body('fullName', 'Укажите имя').isLength({min: 3})
]

export const postCreateValidation = [
  body('text', 'Введите текст статьи').isLength({min: 5}).isString()
]