import { CreateCommentInputDto, CreateCommentOutInputDto } from "../dto/CommentDto/createComments";
import { BadRequestError } from "../errors/BadRequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { CommentsModels } from "../models/Comments";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/idGenerator";
import { CommentDatabase } from "../sql/database/CommentDatabase";
import { PostsDatabase } from "../sql/database/PostDatabase";




export class CommentsBusiness{
    constructor(
        private commentDatabase: CommentDatabase,
        private postDataBase: PostsDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator

    ){}

    // ! Falta a lógica de aumentar o número de comentário no post
    public postComment = async (input:CreateCommentInputDto):Promise<CreateCommentOutInputDto> => {
        const {idPost,comment,token} = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
          throw new UnauthorizedError()
        }

        const postExist = await this.postDataBase.findPost(idPost)

        if (!postExist) {
            throw new BadRequestError("Esse post não existe")
        }

        const id = this.idGenerator.generate()

        const commentModels = new CommentsModels(
            id,
            payload.id,
            idPost,
            comment,
            new Date().toISOString()
        )

        const commentDB = commentModels.toDBModel()
        await this.commentDatabase.insertComment(commentDB)
        
        const commentView = commentModels.toBusinessModel()
        const output = {
            message: "Seu comentário foi criado",
            comment: commentView
        }

        return output
    }
}