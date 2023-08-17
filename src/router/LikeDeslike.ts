import express from 'express'
import { TokenManager } from '../services/TokenManager';
import { LikeDeslikeControllers } from '../controllers/LikeDeslikeControllers';
import { LikeDeslikeBusiness } from '../business/LikeDeslikeBussiness';
import { PostsDatabase } from '../sql/database/PostDatabase';
import { LikesDeslikesDatabase } from '../sql/database/LikeDeslikeDatabase';


export const likeDeslikeRouter = express.Router()
const likeDeslikeControllers = new LikeDeslikeControllers(
    new LikeDeslikeBusiness(
        new PostsDatabase(),
        new TokenManager(),
        new LikesDeslikesDatabase()
    )
);


likeDeslikeRouter.put('/:id', likeDeslikeControllers.addLikeOrDeslike)