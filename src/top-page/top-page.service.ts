import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPage, TopPageDocument } from './top-page.model';

@Injectable()
export class TopPageService {
	constructor(@InjectModel(TopPage.name) private readonly topPageModel: Model<TopPageDocument>) {}

	async create(dto: CreateTopPageDto): Promise<TopPageDocument> {
		return this.topPageModel.create(dto);
	}

	async findById(id: string): Promise<TopPageDocument | null> {
		return this.topPageModel.findById(id).exec();
	}

	async findByAlias(alias: string): Promise<TopPageDocument | null> {
		return this.topPageModel.findOne({ alias }).exec();
	}

	async findByText(text: string): Promise<TopPageDocument[] | null> {
		return this.topPageModel.find({ $text: { $search: text, $caseSensitive: false } }).exec();
	}

	async deleteById(id: string): Promise<TopPageDocument | null> {
		return this.topPageModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateTopPageDto): Promise<TopPageDocument | null> {
		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findByCategory({
		firstCategory,
	}: FindTopPageDto): Promise<
		Omit<TopPageDocument, 'alias' & 'secondCategory' & 'title'>[] | null
	> {
		return this.topPageModel
			.aggregate()
			.match({ firstCategory })
			.group({
				_id: { secondCategory: '$secondCategory' },
				pages: { $push: { alias: '$alias', title: '$title' } },
			})
			.exec();
	}
}
