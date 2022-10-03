import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ReviewController } from '@app/review/review.controller'
import { ReviewService } from '@app/review/review.service'
import { ReviewModel } from '@app/review/review.model'

@Module({
	imports: [SequelizeModule.forFeature([ReviewModel])],
	controllers: [ReviewController],
	providers: [ReviewService]
})
export class ReviewModule {}
