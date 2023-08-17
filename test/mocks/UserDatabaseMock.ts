import { USER_ROLES, UserDB } from "../../src/models/UserModel"
import { BaseDatabase } from "../../src/sql/BaseDatabase"


const usersMock: UserDB[] = [
  {
    id: "id-mock-fulano",
    name: "Fulano",
    email: "fulano@email.com",
    password: "hash-mock-fulano", // senha = "fulano123"
    role: USER_ROLES.NORMAL,
    created_at: new Date().toISOString(),
  },
  {
    id: "id-mock-astrodev",
    name: "Astrodev",
    email: "astrodev@email.com",
    password: "hash-mock-astrodev", // senha = "astrodev99"
    created_at: new Date().toISOString(),
    role: USER_ROLES.ADMIN
  },
]

export class UserDatabaseMock extends BaseDatabase {
  public static TABLE_USERS = "users"


  public async findUserId(
    id: string
  ): Promise<UserDB | undefined> {
    return usersMock.filter(user => user.id === id)[0]
  }

  public async findUserByEmail(
    email: string
  ): Promise<UserDB | undefined> {
    return usersMock.filter(user => user.email === email)[0]
  }

  public async insertUser(
    newUserDB: UserDB
  ): Promise<void> {
    let results = []
    results.push(newUserDB)
  }
}