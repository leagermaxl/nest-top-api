import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

class ProductCharacteristic {
	@Prop()
	name: string;

	@Prop()
	value: string;
}

@Schema({ timestamps: true })
export class Product {
	@Prop()
	image: string;

	@Prop()
	title: string;

	@Prop()
	price: number;

	@Prop()
	oldPrice?: number;

	@Prop()
	credit: number;

	@Prop()
	description: string;

	@Prop()
	advantages: string;

	@Prop()
	disAdvantages?: string;

	@Prop([String])
	categories: string[];

	@Prop([String])
	tags: string[];

	@Prop({ type: [ProductCharacteristic], _id: false })
	characteristics: ProductCharacteristic[];
}

export const SchemaProduct = SchemaFactory.createForClass(Product);
