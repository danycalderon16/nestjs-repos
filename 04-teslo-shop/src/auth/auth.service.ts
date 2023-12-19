import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt  from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from './entities/auth.entity';
import { LoginUserDto, CreateUserDto} from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
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
      return {
        ...user,
        token: this.getJwToken({id: user.id})
      };
    } catch (error) {
      this.hanldeDBErrors(error)
    }
  }

  async login(loginUserDto:LoginUserDto){
 
      const {password, email } = loginUserDto;
      const user = await this.userRepository.findOne({
        where:{email},
        select: {email:true, password:true, id:true}
      });
    
      if(!user){
        throw new BadRequestException('Credentials are not valid (email)')
      }
      if(!bcrypt.compareSync(password,user.password)){
        throw new BadRequestException('Credentials are not valid (password)')
      }
      return {
        ...user,
        token: this.getJwToken({id: user.id})
      };
  }

  private getJwToken(payload:JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }

  private hanldeDBErrors(error: any): never{
    if(error.code === '23505')
    throw new BadRequestException(error.detail)
    console.log(error);
    
    throw new InternalServerErrorException('Please check server logs')
  
  }
}
