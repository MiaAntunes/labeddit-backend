import { PostsControllers } from "../controllers/PostsControllers";
import express from 'express'
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/TokenManager";
import { PostsBussiness } from "../business/PostBussiness";
import { PostsDatabase } from "../sql/database/PostDatabase";
import { UserDatabase } from "../sql/database/UserDatabase";
import { CommentDatabase } from "../sql/database/CommentDatabase";


export const postsRouter = express.Router()
const postsControllers = new PostsControllers(
    new PostsBussiness(
        new PostsDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new UserDatabase(),
        new CommentDatabase()
    )
);


postsRouter.get('/', postsControllers.getPostsAll)
postsRouter.get('/:id', postsControllers.getPostId)
postsRouter.post('/', postsControllers.createPost)
postsRouter.delete('/:id', postsControllers.deletePost)