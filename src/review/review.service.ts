import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ReviewModel } from '@app/review/review.model'
import { ReviewDto } from '@app/review/dto/review.dto'

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(ReviewModel)
		private readonly reviewModel: typeof ReviewModel
	) {}

	async create(userId: number, dto: ReviewDto) {
		return this.reviewModel.create({
			userId,
			...dto
		})
	}
}
