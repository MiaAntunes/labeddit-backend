import express from 'express'
import { UserControllers } from '../controllers/UserControllers'
import { UserBusiness } from '../business/UserBusiness'
import { UserDatabase } from '../sql/database/UserDatabase'
import { IdGenerator } from '../services/idGenerator'
import { TokenManager } from '../services/TokenManager'
import { HashManager } from '../services/HashManager'

export const userRouter = express.Router()

const userControllers = new UserControllers(
    new UserBusiness(
        new UserDatabase(),
        new HashManager(),
        new TokenManager(),
        new IdGenerator()
    )
)

userRouter.get('/login', userControllers.login)

userRouter.post('/signup', userControllers.signUp)