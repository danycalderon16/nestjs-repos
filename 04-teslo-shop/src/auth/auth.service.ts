import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import {  } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import * as bcrypt  from 'bcrypt';
import { LoginUserDto, CreateUserDto} from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}
  async create(createUserDto: CreateUserDto) {
    try {
      const {password, ...userData} = createUserDto

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password,10)
      } )
      await this.userRepository.save(user)
      delete user.password;
      return user
    } catch (error) {
      this.hanldeDBErrors(error)
    }
  }

  async login(loginUserDto:LoginUserDto){
 
      const {password, email } = loginUserDto;
      const user = await this.userRepository.findOne({
        where:{email},
        select: {email:true, password:true}
      });
    
      if(!user){
        throw new BadRequestException('Credentials are not valid (email)')
      }
      if(!bcrypt.compareSync(password,user.password)){
        throw new BadRequestException('Credentials are not valid (password)')
      }
      return user;
  }

  private hanldeDBErrors(error: any): never{
    if(error.code === '23505')
    throw new BadRequestException(error.detail)
    console.log(error);
    
    throw new InternalServerErrorException('Please check server logs')
  
  }
}
