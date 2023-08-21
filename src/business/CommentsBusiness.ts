import { CreateCommentInputDto, CreateCommentOutInputDto } from "../dto/CommentDto/createComments";
import { LikeOrDeslikeCommentsInputDto, LikeOrDeslikeCommentsOutInputDto } from "../dto/CommentDto/putLikeOrDeslikeComments.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { COMMENT_LIKE, CommentsModels, LikeDislikeCommentDB } from "../models/Comments";
import { PostsModels } from "../models/PostsModel";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/idGenerator";
import { CommentDatabase } from "../sql/database/CommentDatabase";
import { PostsDatabase } from "../sql/database/PostDatabase";




export class CommentsBusiness {
    constructor(
        private commentDatabase: CommentDatabase,
        private postDataBase: PostsDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator

    ) { }

    public postComment = async (input: CreateCommentInputDto): Promise<CreateCommentOutInputDto> => {
        const { idPost, comment, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const postExist = await this.postDataBase.findPost(idPost)

        if (!postExist) {
            throw new BadRequestError("Esse post não existe")
        }

        const postModels = new PostsModels(
            postExist.id,
            postExist.creator_id,
            postExist.creator_name,
            postExist.content,
            postExist.likes,
            postExist.deslikes,
            postExist.comments,
            postExist.created_at,
            postExist.updated_at
        )

        // Adicionando um comentário no postsModels
        const addCommentInPost = postModels.addComments()

        const postDB = postModels.toDBModel()

        //Editando o post no banco de dados para ele ter um comentário
        await this.postDataBase.updatePost(postDB)

        const id = this.idGenerator.generate()

        const commentModels = new CommentsModels(
            id,
            payload.id,
            payload.name,
            idPost,
            comment,
            0,
            0,
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

    public putLikeOrDeslikeComment = async (input: LikeOrDeslikeCommentsInputDto): Promise<LikeOrDeslikeCommentsOutInputDto> => {
        const { idComments, idPost, likeOrDeslike, token } = input

        const verificationPostExist = await this.postDataBase.findPost(idPost)

        if(!verificationPostExist){
            throw new BadRequestError("Esse post não existe ou id está errado")
        }

        const verificationCommentsExist = await this.commentDatabase.findComments(idComments)

        if(!verificationCommentsExist){
            throw new BadRequestError("Esse comentário não existe ou id está errado")
        }

        const payload = this.tokenManager.getPayload(token) 

        if(payload === null){
            throw new UnauthorizedError()
        }

        if(verificationCommentsExist.user_id === payload.id){
            throw new BadRequestError("Você não pode curtir seu próprio comentário")
        }

        const commentsModels = new CommentsModels(
            verificationCommentsExist.id,
            verificationCommentsExist.user_id,
            verificationCommentsExist.user_name,
            verificationCommentsExist.post_id,
            verificationCommentsExist.comment,
            verificationCommentsExist.likes,
            verificationCommentsExist.deslike,
            verificationCommentsExist.created_at
        )

        const likeSQLlite = likeOrDeslike ? 1 : 0

        const likeDeslikeDB: LikeDislikeCommentDB = {
            comment_id: commentsModels.getId(),
            user_id: payload.id,
            post_id:commentsModels.getPostId(),
            like: likeSQLlite
        }

        const resultAlreadyLikeOrDeslike = await this.commentDatabase.findLikeOrDeslike(likeDeslikeDB) 

        if( resultAlreadyLikeOrDeslike ===  COMMENT_LIKE.ALREADY_LIKED){
            if(likeOrDeslike){

                await this.commentDatabase.removeLikeDeslike(likeDeslikeDB) 
                commentsModels.removeLike()

            }else{

                await this.commentDatabase.updateLikeOrDeslike(likeDeslikeDB)
                commentsModels.removeLike()
                commentsModels.addDeslike()
           }

        }else if(resultAlreadyLikeOrDeslike === COMMENT_LIKE.ALREADY_DISLIKED){
            if(likeOrDeslike === false){
                await this.commentDatabase.removeLikeDeslike(likeDeslikeDB)
                commentsModels.removeDeslike()
            }else{
                await this.commentDatabase.updateLikeOrDeslike(likeDeslikeDB)
                commentsModels.removeDeslike()
                commentsModels.addLike()
            }
        }else{
            await this.commentDatabase.insertLikeDeslike(likeDeslikeDB)
            likeOrDeslike ? commentsModels.addLike() : commentsModels.addDeslike()
        }

        const updateCommentsDB = commentsModels.toDBModel()

        await this.commentDatabase.updateComment(updateCommentsDB)

        const output = {
            message: "Ok"
        }

        return output
    }
}