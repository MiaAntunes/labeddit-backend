export interface CommentDB {
    id: string,
    user_id: string,
    user_name: string,
    post_id:string,
    comment: string,
    likes: number,
    deslikes: number,
    created_at: string
}

export interface CommentModel {
    id: string,
    userId: string,
    userName: string
    postId: string,
    comment: string,
    likes: number,
    deslikes: number,
    createdAt: string
}

export interface CommentModelIdPost {
    id: string,
    userName: string,
    comments: string,
    likes: number,
    deslikes:number,
    createdAt: string
}

export interface LikeDislikeCommentDB {
    comment_id:string,
    user_id: string,
    post_id: string,
    like: number
  }
  
  export enum COMMENT_LIKE {
    ALREADY_LIKED = "ALREADY LIKED",
    ALREADY_DISLIKED = "ALREADY DISLIKED"
  }

export class CommentsModels {
    constructor(
        private id: string,
        private userId: string,
        private userName: string,
        private postId: string,
        private comment: string,
        private likes: number,
        private deslikes: number,
        private createdAt: string,
    ){}

    public getId = (): string => {
        return this.id
    }

    public setId = (newId: string) => {
        this.id = newId
    }

    public getUserId = (): string => {
        return this.userId
    }

    public setUserId = (newUserId: string) => {
        this.id = newUserId
    }

    public getUserName = (): string => {
        return this.userName
    }

    public setUserName = (newUserName: string) => {
        this.id = newUserName
    }

    public getPostId = (): string => {
        return this.postId
    }

    public setPostId = (newPostId: string) => {
        this.id = newPostId
    }

    public getComments = (): string => {
        return this.comment
    }

    public setComments = (newComments: string) => {
        this.id = newComments
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

    public getCreatedAt = ():string =>{
        return this.createdAt
    }

    public setCreatedAt= (newCreatedAt:string)=>{
        this.createdAt = newCreatedAt
    }

    public toDBModel(): CommentDB {
        return {
          id: this.id,
          user_id: this.userId,
          user_name: this.userName,
          post_id: this.postId,
          comment: this.comment,
          likes: this.likes,
          deslikes:this.deslikes,
          created_at: this.createdAt
        }
      }
    
      public toBusinessModel(): CommentModel {
        return {
          id: this.id,
          userId: this.userId,
          userName:this.userName,
          postId: this.postId,
          comment: this.comment,
          likes: this.likes,
          deslikes: this.deslikes,
          createdAt: this.createdAt
        }
      }

      public toBusinessModelByIdPost(): CommentModelIdPost {
        return {
          id: this.id,
          userName:this.userName,
          comments: this.comment,
          likes: this.likes,
          deslikes: this.deslikes,
          createdAt: this.createdAt
        }
      }
}

