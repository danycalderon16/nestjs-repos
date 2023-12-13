import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate as isUUID } from 'uuid';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Product, ProductImage } from './entities';
@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const {images= [], ...productDetails} = createProductDto
      const product = this.productRepository.create({
        ...productDetails,
      images:images.map(images=> this.productImageRepository.create({url:images}))
    });
      await this.productRepository.save(product);

      return {...product, images};
    } catch (error) {
      this.handleDBExeption(error);
    }
  }

  async findAll(paginationDto:PaginationDto) {
    try {
      const {limit=10,offset=0}=paginationDto;
      return await this.productRepository.find({
        take:limit,
        skip:offset,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Unexpected error, check server logs',
      );
    }
  }

  async findOne(term: string) {
    let product:Product;

    if(isUUID(term)){
      product=await this.productRepository.findOneBy({id:term})    
    }else{
      const queryBuilder = this.productRepository.createQueryBuilder();
      product = await queryBuilder
        .where(`UPPER(title) =:title or slug =:slug`,{
          title:term.toUpperCase(),
          slug:term.toLowerCase(),
        }).getOne();
    }
    if (!product)
      throw new NotFoundException(`Product with ${term} does not exits`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id:id,
      ...updateProductDto,
      images:[]
    })

    if(!product) throw new NotFoundException(`Product with ${id} does not exist`);
    
    try {
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBExeption(error)
    }
  }

  async remove(id: string) {
    try {
      const res = await this.productRepository.delete(id);
      if (res.affected === 0)
        return new BadRequestException(`Product with id ${id} does not exits`);
      return 'ok';
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Unexpected error, check server logs',
      );
    }
  }

  private handleDBExeption(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
