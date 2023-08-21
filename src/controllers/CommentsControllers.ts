import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { CreateCommentSchema } from "../dto/CommentDto/createComments";
import { CommentsBusiness } from "../business/CommentsBusiness";
import { LikeOrDeslikeCommentsSchema } from "../dto/CommentDto/putLikeOrDeslikeComments.dto";


export class CommentsControllers {
    constructor(
        private commentBussiness: CommentsBusiness
    ) { }

    public createComment = async (req: Request, res: Response) => {
        try {

            const input = CreateCommentSchema.parse({
                idPost: req.params.id as string,
                comment: req.body.like as string,
                token: req.headers.authorization as string
            })

            const results = await this.commentBussiness.postComment(input)

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

    public addLikeOrDeslikeComment = async (req: Request, res: Response) => {
        try {

            const input = LikeOrDeslikeCommentsSchema.parse({
                idComments: req.params.id as string,
                idPost: req.params.id as string,
                likeOrDeslike: req.body.like as boolean,
                token: req.headers.authorization as string
            })

            const results =  await this.commentBussiness.putLikeOrDeslikeComment(input)

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