import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import * as bcrypt  from 'bcrypt';

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

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private hanldeDBErrors(error: any): never{
    if(error.code === '23505')
    throw new BadRequestException(error.detail)
    console.log(error);
    
    throw new InternalServerErrorException('Please check server logs')
  
  }
}
