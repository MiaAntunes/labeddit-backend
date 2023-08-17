import { Request, Response } from "express";
import { GetPostShema } from "../dto/PostDto/getPostDTO"
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { PostsBusiness } from "../business/PostBussiness";
import { CreatePostSchema } from "../dto/PostDto/createPostdto";





export class PostsControllers{
    constructor(
        private postsBusiness: PostsBusiness
    ){}

    public getPostsAll = async (req: Request, res: Response) => {
        try {
            const input = GetPostShema.parse({
                token: req.headers.authorization
            })

            const results = await this.postsBusiness.getPostsAll(input)

            res.status(200).send(results)
        }
        catch (error: any) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }       
    }

    public createPost = async (req: Request, res: Response) => {
        try {
            const input = CreatePostSchema.parse({
                newContent: req.body.content as string,
                token: req.headers.authorization as string
            })

            const results = await this.postsBusiness.postPost(input)

            res.status(200).send(results)
        }
        catch (error: any) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
              } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
              } else {
                res.status(500).send("Erro inesperado")
              }
        }
    }
}