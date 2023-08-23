import { COMMENT_LIKE, CommentDB, LikeDislikeCommentDB } from "../../models/Comments";
import { BaseDatabase } from "../BaseDatabase";


export class CommentDatabase extends BaseDatabase{
    public static TABLE_COMMENTS = "comments"
    public static TABLE_LIKEDESLIKECOMMENTS = "likeDeslikeComments"

    public async insertComment(newComment: CommentDB): Promise<void> {

        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).insert(newComment)

    }

    public findComments = async (idComments: string): Promise<CommentDB> =>{

        const [results] = await BaseDatabase
        .connection(CommentDatabase.TABLE_COMMENTS)
        .where({id:idComments})

        return results
    }

    public findCommentsByIdPost = async (idPost: string): Promise<CommentDB[]> =>{

        const results = await BaseDatabase
        .connection(CommentDatabase.TABLE_COMMENTS)
        .where({post_id:idPost})
        console.log(results, "oi")

        return results
    }

    public findLikeOrDeslike = async (likeDeslikeDB: LikeDislikeCommentDB): Promise<COMMENT_LIKE | undefined > =>{

        const [result] = await BaseDatabase
        .connection(CommentDatabase.TABLE_LIKEDESLIKECOMMENTS)
        .select()
        .where({
            comments_id: likeDeslikeDB.comments_id,
            post_id: likeDeslikeDB.post_id,
            user_id: likeDeslikeDB.user_id
        })

        if(result === undefined){
            return undefined
        }
        const resultLikeOrDeslike = result.like === 1 ? COMMENT_LIKE.ALREADY_LIKED : COMMENT_LIKE.ALREADY_DISLIKED   


        return resultLikeOrDeslike as COMMENT_LIKE | undefined

    }

    public removeLikeDeslike = async (likeDeslikeDB:LikeDislikeCommentDB): Promise<void> =>{

        await BaseDatabase
        .connection(CommentDatabase.TABLE_LIKEDESLIKECOMMENTS)
        .delete()
        .where({
            comments_id: likeDeslikeDB.comments_id,
            user_id: likeDeslikeDB.user_id,
            post_id: likeDeslikeDB.post_id
        })

    }

    public updateLikeOrDeslike = async (likeDeslikeDB: LikeDislikeCommentDB): Promise<void> =>{

        await BaseDatabase
        .connection(CommentDatabase.TABLE_LIKEDESLIKECOMMENTS)
        .update(likeDeslikeDB)
        .where({
            comments_id: likeDeslikeDB.comments_id,
            user_id: likeDeslikeDB.user_id,
            post_id: likeDeslikeDB.post_id
        }) 

    }

    public insertLikeDeslike = async (likeDeslikeDB: LikeDislikeCommentDB): Promise<void> =>{

        await BaseDatabase
        .connection(CommentDatabase.TABLE_LIKEDESLIKECOMMENTS)
        .insert(likeDeslikeDB) 
    }

    public updateComment = async (post: CommentDB): Promise<void> => {

        await BaseDatabase
        .connection(CommentDatabase.TABLE_COMMENTS)
        .update(post)
        .where({ id: post.id })

    }

    public deleteComment = async (commentDB: CommentDB):Promise<void> =>{
        await BaseDatabase
        .connection(CommentDatabase.TABLE_COMMENTS)
        .where({ id: commentDB.id })
        .delete()
    }
}