import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { ReviewService } from './review.service';

describe('ReviewService', () => {
	let service: ReviewService;

	const exec = { exec: jest.fn() };
	const reviewRepositoryFactory = () => ({
		find: () => exec,
	});

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ReviewService,
				{ useFactory: reviewRepositoryFactory, provide: getModelToken('Review') },
			],
		}).compile();

		service = module.get<ReviewService>(ReviewService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should be defined', async () => {
		const id = new Types.ObjectId().toHexString();
		reviewRepositoryFactory()
			.find()
			.exec.mockReturnValueOnce([{ productId: id }]);
		const res = await service.findByProductId(id);
		expect(res[0].productId).toBe(id);
	});
});
