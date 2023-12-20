import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/auth.entity';
import { GetRawHeaders } from './decorators/get-raw-headers.decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPriveteRoute(
   @GetUser() user:User,
   @GetUser('email') email:string,
   @GetRawHeaders() rawHeaders:string[]
  ){ 
    
    return {
      ok:true,
      user,
      emailUser:email,
      rawHeaders
    }
  }
  @Get('private2')
  @SetMetadata('roles', ['admin','super-user'])
  @UseGuards(AuthGuard(),UserRoleGuard)
  private2(
   @GetUser() user:User,
  ){ 
    
    return {
      ok:true,
      user
    }
  }



}
