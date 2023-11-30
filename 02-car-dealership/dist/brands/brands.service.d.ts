import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
export declare class BrandsService {
    private brands;
    create(createBrandDto: CreateBrandDto): Brand;
    findAll(): Brand[];
    findOne(id: string): Brand;
    update(id: string, updateBrandDto: UpdateBrandDto): void;
    remove(id: string): void;
    fillBrandsWithSeedData(brands: Brand[]): void;
}
