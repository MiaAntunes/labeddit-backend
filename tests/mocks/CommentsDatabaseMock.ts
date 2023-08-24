import { COMMENT_LIKE, CommentDB, LikeDislikeCommentDB } from "../../src/models/Comments";



const commentsMock = [
    {
        id: "id-mock-post-hello-comment",
        user_id: "id-mock-astrodev",
        user_name: "Astrodev",
        post_id: "id-mock-post-hello",
        comment: "Bom dia, tenha um ótimo final de semana",
        likes: 1,
        deslikes: 0,
        created_at: new Date().toDateString()
    },
    {
        id: "id-mock-post-music-comment",
        user_id: "id-mock-fulano",
        user_name: "Fulano",
        post_id: "id-mock-post-hello",
        comment: "Amo essa música <3",
        likes: 0,
        deslikes: 1,
        created_at: new Date().toDateString()
    }
]

const likeDeslikeCommentsMock = [
    {
        comment_id: "id-mock-post-hello-comment",
        user_id: "id-mock-fulano",
        post_id: "id-mock-post-hello",
        like: 1
    },
    {
        comment_id: "id-mock-post-music-comment",
        user_id: "id-mock-astrodev",
        post_id: "id-mock-post-rotine",
        like: 0
    }
]


export class CommentDatabaseMock {

    public async insertComment(newComment: CommentDB): Promise<void> {


    }

    public findComments = async (idComments: string): Promise<CommentDB> => {

        const [results] = commentsMock.filter((comment)=> comment.id === idComments)

        return results
    }

    public findCommentsByIdPost = async (idPost: string): Promise<CommentDB[]> =>{

        const results = commentsMock.filter((comment)=> comment.post_id === idPost)

        return results
    }

    public findLikeOrDeslike = async (likeDeslikeDB: LikeDislikeCommentDB): Promise<COMMENT_LIKE | undefined> => {

        const [result] = likeDeslikeCommentsMock.filter((like)=>{
            return  like.user_id === likeDeslikeDB.user_id && like.post_id === likeDeslikeDB.post_id
        })

        if(result === undefined){
            return undefined
        }

        const resultLikeOrDeslike = result.like === 1 ? COMMENT_LIKE.ALREADY_LIKED : COMMENT_LIKE.ALREADY_DISLIKED   


        return resultLikeOrDeslike as COMMENT_LIKE | undefined

    }

    public removeLikeDeslike = async (likeDeslikeDB: LikeDislikeCommentDB): Promise<void> => {



    }

    public updateLikeOrDeslike = async (likeDeslikeDB: LikeDislikeCommentDB): Promise<void> => {

  

    }

    public insertLikeDeslike = async (likeDeslikeDB: LikeDislikeCommentDB): Promise<void> => {

   
    }

    public updateComment = async (post: CommentDB): Promise<void> => {

    

    }

    public deleteComment = async (commentDB: CommentDB):Promise<void> =>{

    }
}