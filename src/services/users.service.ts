import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import {Types } from 'mongoose';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users =  userModel.find();
    console.log(users,"user====")
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    const findUser : User[] = await this.users.findOne().where({_id:Types.ObjectId(userId)}).exec();
    if (!findUser) throw new HttpException(409, "User doesn't exist");
    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");
    const findUser: User[]  = await this.users.findOne().where({email:userData.email}).exec();
    console.log(findUser)
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);
    const createUserData = await this.users.create(userData);
    return createUserData;
  }


  public async deleteUser(userId: string): Promise<User[]> {
    const findUser : User[] = await this.users.findOne().where({_id:Types.ObjectId(userId)}).exec();
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const deleteUserData: User[] = this.users.deleteOne().where({_id:Types.ObjectId(userId)});
    return deleteUserData;
  }
}

export default UserService;
