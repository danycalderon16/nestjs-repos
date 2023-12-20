import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
@Injectable()
export class SeedService {
  
  constructor(
    private readonly productService: ProductsService,
    @InjectRepository(User)
    private readonly userReposiroty:Repository<User>) {}

  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertUsers();

    await this.insertNewProducts(adminUser);
    return 'SEED EXECUTE';
  }

  private async deleteTables(){
    await this.productService.deleteAllProducts();
    const queryBuilder = this.userReposiroty.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute(); 
  }

  private async insertUsers(){
    const seedUsers = initialData.users;
    const users:User[] = [];
    seedUsers.forEach(user => {
      users.push(this.userReposiroty.create(user));
    });
    const dbUsers = await this.userReposiroty.save(seedUsers);
    return dbUsers[0]; 
  }

  private async insertNewProducts(user:User){
    const products = initialData.products;
    const insertPromises = [];

    products.forEach((product) => {
      insertPromises.push(this.productService.create(product,user));
    });

    await Promise.all(insertPromises);
    return true;
  }
}
