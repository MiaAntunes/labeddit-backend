import { CreateUserInputDto, CreateUserOutInputDto } from "../dto/UserDto/createUserdto"
import { LoginUserInputDTO, LoginUserOutinputDTO } from "../dto/UserDto/loginUserdto"
import { BadRequestError } from "../errors/BadRequestError"
import { TokenPayload, USER_ROLES, User } from "../models/UserModel"
import { HashManager } from "../services/HashManager"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/idGenerator"
import { UserDatabase } from "../sql/database/UserDatabase"




export class UserBusiness{
    constructor(
        private userDatabase: UserDatabase,
        private hashManager: HashManager,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator
    ){}

    public getUser = async (input:LoginUserInputDTO):Promise<LoginUserOutinputDTO> => {
        const {email, password} = input

        const userDB = await this.userDatabase.findUserByEmail(email)

        if(!userDB){
            throw new BadRequestError("E-mail e/ou senha inválido(s)")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )

        const hashedPassword = userDB.password
        const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)
        if(!isPasswordCorrect){
            throw new BadRequestError("'password' incorretos")
        }

        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
          }
      
        const token = this.tokenManager.createToken(payload)

        const output = {
            token: token
        }

        return output
     }

    public postUser = async (input:CreateUserInputDto):Promise <CreateUserOutInputDto> => {
        const { newName, newEmail, newPassword} = input

        const verificationUserExist = await this.userDatabase.findUserByEmail(newEmail)// Ok está pegando

        if (verificationUserExist) { //  regra de negocio
            throw new BadRequestError("esse email já existe.")
        }

        const newId = this.idGenerator.generate()

        const hashedPassword = await this.hashManager.hash(newPassword)

        const newUser = new User(
            newId,
            newName,
            newEmail,
            hashedPassword,
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )

        const userDB = newUser.toDBModel()
        await this.userDatabase.insertUser(userDB)

        const payload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
          }
      
        const token = this.tokenManager.createToken(payload)

        const output: CreateUserOutInputDto = {
            message: "Criado a conta!",
            token: token
        }

        return output
    }
}