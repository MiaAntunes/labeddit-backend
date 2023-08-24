import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './router/UserRouter'
import { postsRouter } from './router/PostRouter'
import { likeDeslikeRouter } from './router/LikeDeslike'
import { commentsRouter } from './router/Comments'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT) || 3003, () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`)
})
app.use('/user', userRouter)

app.use('/posts', postsRouter)
app.use('/post/like', likeDeslikeRouter)
app.use('/post/comment', commentsRouter)
app.use('/post/:id/comments', commentsRouter) // -> Criar um comentário
