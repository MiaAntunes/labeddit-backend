import { LikeDislikeDB, POST_LIKE } from "../../src/models/PostsModel"

const likeDeslikeMocks = [
    {
        user_id: "id-mock-astrodev",
        post_id: "id-mock-post-hello",
        like: 1
    },
    {
        user_id: "id-mock-astrodev",
        post_id: "id-mock-post-rotine",
        like: 1
    },
    {
        user_id: "id-mock-fulano",
        post_id: "id-mock-post-music",
        like: 0
    },
]

export class LikeDeslikeDatabaseMock {

    public findLikeOrDeslike = async (likeDeslikeDB: LikeDislikeDB): Promise < POST_LIKE | undefined > =>{

        const [result] = likeDeslikeMocks.filter((like)=>{
            return like.like === likeDeslikeDB.like && like.user_id === likeDeslikeDB.user_id && like.post_id === likeDeslikeDB.post_id
        })
        console.log(result)

        if(result === undefined){
            return undefined
        }

        const resultLikeOrDeslike = result.like === 1 ? POST_LIKE.ALREADY_LIKED : POST_LIKE.ALREADY_DISLIKED   


        return resultLikeOrDeslike as POST_LIKE 
    }

    public removeLikeDeslike = async (likeDeslikeDB:LikeDislikeDB):Promise<void> =>{


    }

    public updateLikeOrDeslike = async (likeDeslikeDB: LikeDislikeDB): Promise<void> =>{


    }

    public insertLikeDeslike = async (likeDeslikeDB: LikeDislikeDB): Promise<void> =>{


    }
}