import { CreatePostInputDto, CreatePostOutInputDto } from "../dto/PostDto/createPostdto"
import { DeletePostInputDto, DeletePostOutInputDto } from "../dto/PostDto/deletePostDto"
import { GetPostInputDTO, GetPostOutinputDTO } from "../dto/PostDto/getPostDTO"
import { GetPostIdInputDTO, GetPostIdOutinputDTO } from "../dto/PostDto/getPostIdDto"
import { BadRequestError } from "../errors/BadRequestError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { CommentsModels } from "../models/Comments"
import { PostDB, PostIdCommentModel, PostsModels } from "../models/PostsModel"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/idGenerator"
import { CommentDatabase } from "../sql/database/CommentDatabase"
import { PostsDatabase } from "../sql/database/PostDatabase"
import { UserDatabase } from "../sql/database/UserDatabase"



export class PostsBussiness {
    constructor(
        private postsDatabase: PostsDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private userDatabase: UserDatabase,
        private commentDatabase: CommentDatabase
    ) { }

    public getPostsAll = async (input: GetPostInputDTO): Promise<GetPostOutinputDTO> => {
        const { token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const postDB = await this.postsDatabase.getPostsAll()

        const posts = postDB.map((post) => {
            const postModel = new PostsModels(
                post.id,
                post.creator_id,
                post.creator_name,
                post.content,
                post.likes,
                post.deslikes,
                post.comments,
                post.created_at,
                post.updated_at
            )

            return postModel.toBusinessModel()
        })

        const output: GetPostOutinputDTO = posts

        return output
    }

    // //! Estou com dúvida para juntar o post + todos os comentários daquele post
    public getPostId = async (input: GetPostIdInputDTO): Promise<GetPostIdOutinputDTO> => {
        const { idPost, token } = input
        console.log("oie")
        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const postDB = await this.postsDatabase.findPost(idPost)

        if(!postDB){
            throw new BadRequestError("Esse idPost está incorreto ou não existe mais")
        }

        const commentsByPostId = await this.commentDatabase.findCommentsByIdPost(idPost)
        console.log(commentsByPostId)
        console.log(postDB)

        const postModels = new PostsModels(
            postDB.id,
            postDB.creator_id,
            postDB.creator_name,
            postDB.content,
            postDB.likes,
            postDB.deslikes,
            postDB.comments,
            postDB.created_at,
            postDB.updated_at
        )

        const commentsModels = commentsByPostId.map((comment)=>{
            const model = new CommentsModels(
                comment.id,
                comment.user_id,
                comment.user_name,
                comment.post_id,
                comment.comment,
                comment.likes,
                comment.deslikes,
                comment.created_at
            )

            return model.toBusinessModelByIdPost()
        })

        const results: PostIdCommentModel = {
            postId: postModels.getId(),
            content: postModels.getContent(),
            likes:postModels.getLikes(),
            deslikes: postModels.getLikes(),
            commentQuantity: postModels.getComments(),
            createdAt: postModels.getCreatedAt(),
            updatedAt: postModels.getUpdatedAt(),
            creator:{
                name:postModels.getCreatorName(),
                usersId: postModels.getCreatorId(),
            },
            comments: commentsModels
        }

        return results
    }

    public postPost = async (input: CreatePostInputDto): Promise<CreatePostOutInputDto> => {
        const { newContent, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const user = await this.userDatabase.findUserId(payload.id)

        const newId = this.idGenerator.generate()

        const post = new PostsModels(
            newId,
            payload.id,
            payload.name,
            newContent,
            0,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString()
        )

        const newPostDB = post.toDBModel()
        await this.postsDatabase.insertPosts(newPostDB)

        const output: CreatePostOutInputDto = {
            message: "Criado o novo Post"
        }

        return output
    }

    public deletePost = async (input:DeletePostInputDto): Promise<DeletePostOutInputDto> =>{
        const {idPost, token} = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const postDB = await this.postsDatabase.findPost(idPost)

        if(!postDB){
            throw new BadRequestError("Esse idPost está incorreto ou não existe mais")
        }
        
        await this.postsDatabase.deletePost(postDB)

        const output ={
            message: "Seu post foi deletado"
        }

        return output
    }
}