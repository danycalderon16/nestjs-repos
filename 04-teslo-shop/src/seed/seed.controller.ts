import { Controller, Get,  } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth } from 'src/auth/decorators';
import { Validroles } from 'src/auth/interfaces';
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(Validroles.admin)
  executeSeed() {
    return this.seedService.runSeed();
  }

}
