import { CommentDB } from "../../models/Comments";
import { BaseDatabase } from "../BaseDatabase";


export class CommentDatabase extends BaseDatabase{
    public static TABLE_COMMENTS = "comments"

    public async insertComment(newComment: CommentDB): Promise<void> {

        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).insert(newComment)

    }
}