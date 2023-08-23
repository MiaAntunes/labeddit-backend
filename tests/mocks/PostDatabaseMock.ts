import { PostDB } from "../../src/models/PostsModel"
import { BaseDatabase } from "../../src/sql/BaseDatabase"





const postDBMock = [
    {
        id: "id-mock-post-hello",
        creator_id: "id-mock-fulano",
        creator_name: "Fulano",
        content: "Hello, how u doing? - friends",
        likes: 3,
        deslikes: 0,
        comments: 5,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "id-mock-post-rotine",
        creator_id: "id-mock-fulano",
        creator_name: "Fulano",
        content: "Rotine my day",
        likes: 100,
        deslikes: 0,
        comments: 10,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "id-mock-post-music",
        creator_id: "id-mock-astrodev",
        creator_name: "Astrodev",
        content: "Dance",
        likes: 103,
        deslikes: 1,
        comments: 10,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: "id-mock-post-dance",
        creator_id: "id-mock-astrodev",
        creator_name: "Astrodev",
        content: "Music",
        likes: 103,
        deslikes: 1,
        comments: 10,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
]

export class PostsDataBaseMocks extends BaseDatabase {

    public getPostsAll = async (): Promise<PostDB[]> => {
        return postDBMock
    }

    public insertPosts = async (newPosts: PostDB): Promise<void> => {

        
    }

    public findPost = async (idPost: string): Promise<PostDB> => {
        const [results] = postDBMock.filter((post)=> post.id === idPost)

        return results

    }

    public updatePost = async (post: PostDB): Promise<void> => {
      // ! Preciso fazer algo?
    }

    
    // public findPostComments = async (idPost: string): Promise <any> =>{

    //     // const [results] = await BaseDatabase
    //     // .connection(PostsDatabase.TABLE_POSTS)
    //     // .select(
    //     //     "posts.id AS postId",
    //     //     "posts.creator_id AS creatorId",
    //     //     "posts.creator_name AS creatorName",
    //     //     "posts.content AS content",
    //     //     "posts.likes AS postLikes",
    //     //     "posts.deslikes AS postDeslikes",
    //     //     "posts.created_at AS postCreatedAt",
    //     //     "posts.updated_at AS postUpdatedAt",
    //     //     "comments.id AS commentId",
    //     //     "comments.name AS commentName",
    //     //     "comments.comment AS comment",
    //     //     "comments.likes AS commentLikes",
    //     //     "comments.deslikes AS commentDeslikes",
    //     //     "comments.created_at  AS commentCreatedAt",
    //     // )
    //     // .innerJoin(
    //     //     "comments", "comments.post_id", "=", "posts.id"
    //     // )

    //     return "a"
    // }

    public deletePost = async (postDBUpdate: PostDB):Promise<void> =>{

    }
}
