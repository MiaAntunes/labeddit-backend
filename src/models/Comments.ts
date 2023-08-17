export interface CommentDB {
    id: string,
    user_id: string,
    post_id:string;
    comment: string,
    created_at: string
}

export interface CommentModel {
    id: string,
    userId: string,
    comment: string,
    createdAt: string
}

export class CommentsModels {
    constructor(
        private id: string,
        private userId: string,
        private postId: string,
        private comment: string,
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
          post_id: this.postId,
          comment: this.comment,
          created_at: this.createdAt
        }
      }
    
      public toBusinessModel(): CommentModel {
        return {
          id: this.id,
          userId: this.userId,
          postId: this.postId,
          comment: this.comment,
          createdAt: this.createdAt
        }
      }
}

