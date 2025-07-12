/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './../src/auth/auth.constants';

const authDto: AuthDto = {
	login: 'max@gmail.com',
	password: '123',
};

describe('AppController (e2e)', () => {
	let app: INestApplication<App>;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(authDto)
			.expect(200)
			.then((req: request.Response) => {
				expect(req.body.access_token).toBeDefined();
			});
	});

	it('/auth/login (POST) - fail login', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...authDto, login: 'max123@gmail.com' })
			.expect(401, {
				statusCode: 401,
				error: 'Unauthorized',
				message: USER_NOT_FOUND_ERROR,
			});
	});

	it('/auth/login (POST) - fail password', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...authDto, password: '12345' })
			.expect(401, {
				statusCode: 401,
				error: 'Unauthorized',
				message: WRONG_PASSWORD_ERROR,
			});
	});
});
