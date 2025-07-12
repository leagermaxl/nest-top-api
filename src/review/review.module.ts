import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { Review, SchemaReview } from './review.model';
import { ReviewService } from './review.service';

@Module({
	controllers: [ReviewController],
	imports: [MongooseModule.forFeature([{ name: Review.name, schema: SchemaReview }])],
	providers: [ReviewService],
})
export class ReviewModule {}
