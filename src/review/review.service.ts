import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ReviewModel } from '@app/review/review.model'
import { ReviewDto } from '@app/review/dto/review.dto'

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(ReviewModel) private readonly reviewModel: typeof ReviewModel
	) {}

	async create(userId: number, dto: ReviewDto) {
		return await this.reviewModel.create({
			userId,
			...dto
		})
	}

	async findAll() {
		return this.reviewModel.findAll({
			order: [['createdAt', 'DESC']],
			include: [
				{ all: true }
			]
		})
	}

	async findOne(id: number) {
		const review = await this.reviewModel.findByPk(id)
		if (!review) throw new NotFoundException('Review not found')

		return review
	}

	async remove(id: number) {
		return this.reviewModel.destroy({ where: { id } })
	}
}
