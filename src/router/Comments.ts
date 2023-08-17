import express from 'express'
import { CommentsControllers } from '../controllers/CommentsControllers'
import { CommentsBusiness } from '../business/CommentsBusiness'
import { CommentDatabase } from '../sql/database/CommentDatabase'
import { PostsDatabase } from '../sql/database/PostDatabase'
import { TokenManager } from '../services/TokenManager'
import { IdGenerator } from '../services/idGenerator'



export const commentsRouter = express.Router()
const commentsControllers = new CommentsControllers(
   new CommentsBusiness(
    new CommentDatabase(),
    new PostsDatabase(),
    new TokenManager(),
    new IdGenerator()
   ) 
)

commentsRouter.post("/:id", commentsControllers.createComment)