/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { disconnect, Types } from 'mongoose';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { REVIEW_NOT_FOUND_ERROR } from '../src/review/review.constants';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
	name: 'Max',
	title: 'New post',
	description: 'Something',
	rating: 4,
	productId,
};

const authDto: AuthDto = {
	login: 'max@gmail.com',
	password: '123',
};

describe('AppController (e2e)', () => {
	let app: INestApplication<App>;
	let createdId: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const { body } = await request(app.getHttpServer()).post('/auth/login').send(authDto);
		token = body.access_token;
	});

	it('/review (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/review')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});

	it('/review (POST) - fail', async () => {
		return request(app.getHttpServer())
			.post('/review')
			.send({ ...testDto, rating: '0' })
			.expect(400)
			.then(({ body }: request.Response) => {
				// console.log(body);
			});
	});

	it('/review/product/:productId (GET) - success', async () => {
		return request(app.getHttpServer())
			.get('/review/product/' + productId)
			.expect(200)
			.then((res: request.Response) => {
				// console.log(res);
				expect(res.body.length).toBe(1);
			});
	});

	it('/review/product/:productId (GET) - fail', async () => {
		return request(app.getHttpServer())
			.get('/review/product/' + new Types.ObjectId().toHexString())
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(0);
			});
	});

	it('/review/:id (DELETE) - success', async () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdId)
			.set('Authorization', 'Bearer ' + token)
			.expect(200);
	});

	it('/review/:id (DELETE) - fail', async () => {
		return request(app.getHttpServer())
			.delete('/review/' + new Types.ObjectId().toHexString())
			.set('Authorization', 'Bearer ' + token)
			.expect(404, {
				statusCode: 404,
				message: REVIEW_NOT_FOUND_ERROR,
			});
	});

	afterAll(async () => {
		await disconnect();
	});
});
