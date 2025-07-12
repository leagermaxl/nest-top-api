import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TopPageDocument = HydratedDocument<TopPage>;

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Product,
}

export class HhData {
	@Prop()
	count: number;

	@Prop()
	juniorSalary: number;

	@Prop()
	middleSalary: number;

	@Prop()
	seniorSalary: number;
}

export class TopPageAdvantages {
	@Prop()
	title: string;

	@Prop()
	description: string;
}

@Schema({ timestamps: true })
export class TopPage {
	@Prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@Prop()
	secondCategory: string;

	@Prop({ unique: true })
	alias: string;

	@Prop()
	title: string;

	// @Prop()
	// metaTitle: string;

	// @Prop()
	// metaDescription: string;

	@Prop()
	category: string;

	@Prop()
	hh?: HhData;

	@Prop([TopPageAdvantages])
	advantages?: TopPageAdvantages[];

	@Prop()
	seoText?: string;

	@Prop()
	tagsTitle: string;

	@Prop([String])
	tags: string[];
}

export const SchemaTopPage = SchemaFactory.createForClass(TopPage);

SchemaTopPage.index({ '$**': 'text' });
