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
        likes: 0,
        deslikes: 0,
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

    

    public deletePost = async (postDBUpdate: PostDB):Promise<void> =>{

    }
}
