import { PostDB } from "../../models/PostsModel";
import { BaseDatabase } from "../BaseDatabase";



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

    // ! Se tiver que mostrar todos os comentários quando ele for clicado precisará do idDoPost e irá ser utilizado o innerJoin
}