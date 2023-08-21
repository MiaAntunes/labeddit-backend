import { PostDB } from "../../models/PostsModel";
import { BaseDatabase } from "../BaseDatabase";
import { CommentDatabase } from "./CommentDatabase";



export class PostsDatabase extends BaseDatabase{
    public static TABLE_POSTS = "posts"

    public getPostsAll = async (): Promise<PostDB[]> =>{

        let response: PostDB[] = await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)

        return response
    }

    public insertPosts = async (newPosts: PostDB): Promise<void> =>{

        await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .insert(newPosts)

    }

    public findPost = async(idPost: string): Promise<PostDB> => {

        const [results] = await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .where({ id: idPost })

        return results

    }

    public updatePost = async (post: PostDB): Promise<void> => {

        await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .update(post)
        .where({ id: post.id })

    }

    public findPostComments = async (idPost: string): Promise <any> =>{

        const [results] = await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .select(
            "posts.id AS postId",
            "posts.creator_id AS creatorId",
            "posts.creator_name AS creatorName",
            "posts.content AS content",
            "posts.likes AS postLikes",
            "posts.deslikes AS postDeslikes",
            "posts.created_at AS postCreatedAt",
            "posts.updated_at AS postUpdatedAt",
            "comments.id AS commentId",
            "comments.name AS commentName",
            "comments.comment AS comment",
            "comments.likes AS commentLikes",
            "comments.deslikes AS commentDeslikes",
            "comments.created_at  AS commentCreatedAt",
        )
        .innerJoin(
            "comments", "comments.post_id", "=", "posts.id"
        )

        return results
    }

    // ! Se tiver que mostrar todos os comentários quando ele for clicado precisará do idDoPost e irá ser utilizado o innerJoin
}