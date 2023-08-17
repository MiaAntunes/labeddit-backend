import { LikeDislikeDB, POST_LIKE } from "../../models/PostsModel";
import { BaseDatabase } from "../BaseDatabase";



export class LikesDeslikesDatabase extends BaseDatabase{
    public static TABLE_LIKEDESLIKE = "likeDeslike"

    public findLikeOrDeslike = async (likeDeslikeDB: LikeDislikeDB): Promise < POST_LIKE | undefined > =>{

        const [result] = await BaseDatabase
        .connection(LikesDeslikesDatabase.TABLE_LIKEDESLIKE)
        .select()
        .where({
            user_id: likeDeslikeDB.user_id,
            post_id: likeDeslikeDB.post_id
        })

        if(result === undefined){
            return undefined
        }
        const resultLikeOrDeslike = result.like === 1 ? POST_LIKE.ALREADY_LIKED : POST_LIKE.ALREADY_DISLIKED   


        return resultLikeOrDeslike as POST_LIKE | undefined
    }

    public removeLikeDeslike = async (likeDeslikeDB:LikeDislikeDB):Promise<void> =>{

        await BaseDatabase
        .connection(LikesDeslikesDatabase.TABLE_LIKEDESLIKE)
        .delete()
        .where({
            user_id: likeDeslikeDB.user_id,
            post_id: likeDeslikeDB.post_id
        })

    }

    public updateLikeOrDeslike = async (likeDeslikeDB: LikeDislikeDB): Promise<void> =>{

        await BaseDatabase
        .connection(LikesDeslikesDatabase.TABLE_LIKEDESLIKE)
        .update(likeDeslikeDB)
        .where({
            user_id: likeDeslikeDB.user_id,
            post_id: likeDeslikeDB.post_id
        }) 

    }

    public insertLikeDeslike = async (likeDeslikeDB: LikeDislikeDB): Promise<void> =>{

        await BaseDatabase
        .connection(LikesDeslikesDatabase.TABLE_LIKEDESLIKE)
        .insert(likeDeslikeDB) 
    }
 
}
