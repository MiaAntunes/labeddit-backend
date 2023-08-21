import { UserDB } from "../../models/UserModel";
import { BaseDatabase } from "../BaseDatabase";


export class UserDatabase extends BaseDatabase{
    public static TABLE_USERS = "users"

    public findUserByEmail = async ( newEmail: string): Promise<UserDB> => {

        const [userDB] = await BaseDatabase
          .connection(UserDatabase.TABLE_USERS)
          .where({email: newEmail })
          console.log(userDB)
    
        return userDB as UserDB 
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
