import { UserDB } from "../../models/UserModel";
import { BaseDatabase } from "../BaseDatabase";


export class UserDatabase extends BaseDatabase{
    public static TABLE_USERS = "users"

    public findUserByEmail = async ( email: string): Promise<UserDB | undefined> => {

        const [userDB] = await BaseDatabase
          .connection(UserDatabase.TABLE_USERS)
          .select()
          .where({ email })
    
        return userDB as UserDB | undefined
    }

    public async findUserId (id: string): Promise<UserDB | undefined>{

      const [results]= await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({id: id})

      return results
  }

    public insertUser = async (userDB: UserDB): Promise<void> => {

        await BaseDatabase
          .connection(UserDatabase.TABLE_USERS)
          .insert(userDB)
    } 
}
