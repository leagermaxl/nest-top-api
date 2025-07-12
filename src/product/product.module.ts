import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { Product, SchemaProduct } from './product.model';
import { ProductService } from './product.service';

@Module({
	controllers: [ProductController],
	imports: [MongooseModule.forFeature([{ name: Product.name, schema: SchemaProduct }])],
	providers: [ProductService],
})
export class ProductModule {}
