import { CreatePostInputDto, CreatePostOutInputDto } from "../dto/PostDto/createPostdto"
import { GetPostInputDTO, GetPostOutinputDTO } from "../dto/PostDto/getPostDTO"
import { GetPostIdInputDTO, GetPostIdOutinputDTO } from "../dto/PostDto/getPostIdDto"
import { BadRequestError } from "../errors/BadRequestError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { PostDB, PostIdCommentModel, PostsModels } from "../models/PostsModel"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/idGenerator"
import { PostsDatabase } from "../sql/database/PostDatabase"
import { UserDatabase } from "../sql/database/UserDatabase"



export class PostsBussiness {
    constructor(
        private postsDatabase: PostsDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private userDatabase: UserDatabase
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
    // public getPostId = async (input: GetPostIdInputDTO): Promise<GetPostIdOutinputDTO> => {
    //     const { idPost, token } = input

    //     const payload = this.tokenManager.getPayload(token)

    //     if (!payload) {
    //         throw new UnauthorizedError()
    //     }

    //     const postDB = await this.postsDatabase.findPostComments(idPost)

    //     console.log(postDB)

    //     if(!postDB){
    //         throw new BadRequestError("Esse post não existe ou id está errado")
    //     }

    //     // ! const postModels = new PostsModels()

    //     const postIdView = "Colocar o postModels.toPostIdCommentsModel()"

    //     const output = {
    //         postIdView
    //     }
    // }

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
}