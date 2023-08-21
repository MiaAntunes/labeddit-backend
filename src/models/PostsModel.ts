
export interface PostDB {
    id: string,
    creator_id: string,
    creator_name: string,
    content: string,
    likes: number,
    deslikes: number,
    comments:number,
    created_at: string,
    updated_at: string
}

export interface PostModel {
    postId: string,
    content: string,
    likes: number,
    deslikes: number,
    comments:number,
    createdAt: string,
    updatedAt: string
    creator: {
        usersId: string,
        name: string
    }
}

// ! HELP NO TYPE DO POST +COMMENT DB
export interface PostIdCommentModel{
    postId: string,
    content: string,
    likes: number,
    deslikes: number,
    createdAt: string,
    updatedAt: string
    creator: {
        usersId: string,
        name: string
    }
    comments: [
        {
            userName: string,
            comments: string,
            likes: number,
            deslikes:number,
            createdAt: string
        }   
    ]
}



export interface LikeDislikeDB {
    user_id: string,
    post_id: string,
    like: number
  }
  
  export enum POST_LIKE {
    ALREADY_LIKED = "ALREADY LIKED",
    ALREADY_DISLIKED = "ALREADY DISLIKED"
  }

export class PostsModels{
    constructor(
        private id: string,
        private creatorId: string,
        private creatorName: string,
        private content: string,
        private likes: number,
        private deslikes: number,
        private comments: number,
        private createdAt: string,
        private updatedAt: string
    ){}

    public getId = (): string => {
        return this.id
    }

    public setId = (newId: string) => {
        this.id = newId
    }

    public getCreatorId = ():string =>{
        return this.creatorId
    }

    public setCreatorId = (newCreatorId:string) =>{
        this.creatorId = newCreatorId
    }

    public setCreatorName = (newCreatorName:string) =>{
        this.creatorId = newCreatorName
    }

    public getCreatorName = ():string =>{
        return this.creatorName
    }

    public getContent = ():string =>{
        return this.content
    }

    public setContent = (newContent:string)=>{
        this.content = newContent
    }

    public getLikes = ():number =>{
        return this.likes
    }

    public setLikes = (newLikes:number)=>{
        this.likes = newLikes
    }

    public addLike = ():void =>{
        this.likes++
    }

    public removeLike = ():void =>{
        this.likes--
    }

    public getDeslikes = ():number =>{
        return this.deslikes
    }

    public setDeslikes = (newDeslikes:number)=>{ 
        this.deslikes = newDeslikes
    }

    public addDeslike = ():void =>{
        this.deslikes++
    }

    public removeDeslike = ():void =>{
        this.deslikes--
    }

    public getComments = ():number =>{
        return this.comments
    }

    public setComments = (newComments:number)=>{
        this.comments = newComments
    }

    public addComments = ():void =>{
        this.comments++
    }

    public removeComments = ():void =>{
        this.comments--
    }

    public getCreatedAt = ():string =>{
        return this.createdAt
    }

    public setCreatedAt= (newCreatedAt:string)=>{
        this.createdAt = newCreatedAt
    }

    public getUpdatedAt = ():string =>{
        return this.updatedAt
    }

    public setUpdatedAt= (newUpdateAt:string)=>{
        this.updatedAt = newUpdateAt
    }

    public toDBModel():PostDB{
        return {
            id: this.id,
            creator_id: this.creatorId,
            creator_name: this.creatorName,
            content: this.content,
            likes: this.likes,
            deslikes: this.deslikes,
            comments:this.comments,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }

    public toBusinessModel():PostModel{
        return{
            postId: this.id,
            content: this.content,
            likes: this.likes,
            deslikes: this.deslikes,
            comments: this.comments,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                usersId: this.creatorId,
                name: this.creatorName
            }
        }
    }

}