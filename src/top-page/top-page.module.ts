import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageController } from './top-page.controller';
import { SchemaTopPage, TopPage } from './top-page.model';
import { TopPageService } from './top-page.service';

@Module({
	controllers: [TopPageController],
	providers: [ConfigService, TopPageService],
	imports: [MongooseModule.forFeature([{ name: TopPage.name, schema: SchemaTopPage }])],
})
export class TopPageModule {}
