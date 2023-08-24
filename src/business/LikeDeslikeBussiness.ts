import { LikeOrDeslikeInputDto, LikeOrDeslikeOutInputDto } from "../dto/LikeDeslikeDto/LikeOrDeslikeDto";
import { BadRequestError } from "../errors/BadRequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { LikeDislikeDB, POST_LIKE, PostsModels } from "../models/PostsModel";
import { TokenManager } from "../services/TokenManager";
import { LikesDeslikesDatabase } from "../sql/database/LikeDeslikeDatabase";
import { PostsDatabase } from "../sql/database/PostDatabase";



export class LikeDeslikeBusiness{
    constructor(
        private postsDatabase: PostsDatabase,
        private tokenManager: TokenManager,
        private likesDeslikesDatabase: LikesDeslikesDatabase
    ){}

    public putLikeOrDeslike = async (input:LikeOrDeslikeInputDto):Promise<LikeOrDeslikeOutInputDto> => {
        const {idPost, likeOrDeslike, token} = input

        const verificationPostExist = await this.postsDatabase.findPost(idPost)

        const payload = this.tokenManager.getPayload(token) 

        if(!verificationPostExist){
            throw new BadRequestError("Esse post não existe ou id está errado")
        }

        if(payload === null){
            throw new UnauthorizedError()
        }

        if(verificationPostExist.creator_id === payload.id){
            throw new BadRequestError("Você não pode curtir seu próprio post")
        }

        const postModels = new PostsModels(
            verificationPostExist.id,
            verificationPostExist.creator_id,
            verificationPostExist.creator_name,
            verificationPostExist.content,
            verificationPostExist.likes,
            verificationPostExist.deslikes,
            verificationPostExist.comments,
            verificationPostExist.created_at,
            verificationPostExist.updated_at
        )

        const likeSQLlite = likeOrDeslike ? 1 : 0

        const likeDeslikeDB: LikeDislikeDB = {
            user_id: payload.id,
            post_id: postModels.getId(),
            like: likeSQLlite
        }

        const resultAlreadyLikeOrDeslike = await this.likesDeslikesDatabase.findLikeOrDeslike(likeDeslikeDB)

        if( resultAlreadyLikeOrDeslike === POST_LIKE.ALREADY_LIKED){
            if(likeOrDeslike){

                await this.likesDeslikesDatabase.removeLikeDeslike(likeDeslikeDB) 
                postModels.removeLike()

            }else{

                await this.likesDeslikesDatabase.updateLikeOrDeslike(likeDeslikeDB)
                postModels.removeLike()
                postModels.addDeslike()

            }
        }else if(resultAlreadyLikeOrDeslike === POST_LIKE.ALREADY_DISLIKED){
            if(likeOrDeslike === false){
                await this.likesDeslikesDatabase.removeLikeDeslike(likeDeslikeDB)
                postModels.removeDeslike()
            }else{
                await this.likesDeslikesDatabase.updateLikeOrDeslike(likeDeslikeDB)
                postModels.removeDeslike()
                postModels.addLike()
            }
        }else{
            await this.likesDeslikesDatabase.insertLikeDeslike(likeDeslikeDB)
            likeOrDeslike ? postModels.addLike() : postModels.addDeslike()
        }

        // Update
        const updatePostDB = postModels.toDBModel()

        await this.postsDatabase.updatePost(updatePostDB)

        const output = {
            message: "Ok"
        }

        return output
   
    }
     
}