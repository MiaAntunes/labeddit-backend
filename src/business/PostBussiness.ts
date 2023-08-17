import { CreatePostInputDto, CreatePostOutInputDto } from "../dto/PostDto/createPostdto"
import { GetPostInputDTO, GetPostOutinputDTO } from "../dto/PostDto/getPostDTO"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { PostDB, PostsModels } from "../models/PostsModel"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/idGenerator"
import { PostsDatabase } from "../sql/database/PostDatabase"
import { UserDatabase } from "../sql/database/UserDatabase"



export class PostsBusiness {
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
            user.id,
            user.name,
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