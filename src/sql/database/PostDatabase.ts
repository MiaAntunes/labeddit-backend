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


    public deletePost = async (postDBUpdate: PostDB):Promise<void> =>{
        await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .where({ id: postDBUpdate.id })
        .delete()
    }

}