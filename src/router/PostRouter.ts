import { PostsControllers } from "../controllers/PostsControllers";
import express from 'express'
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/TokenManager";
import { PostsBusiness } from "../business/PostBussiness";
import { PostsDatabase } from "../sql/database/PostDatabase";
import { UserDatabase } from "../sql/database/UserDatabase";


export const postsRouter = express.Router()
const postsControllers = new PostsControllers(
    new PostsBusiness(
        new PostsDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new UserDatabase()
    )
);


postsRouter.get('/', postsControllers.getPostsAll)
postsRouter.post('/', postsControllers.createPost)