import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { fn, col } from 'sequelize'
import { IStatisticItem } from '@app/statistics/statistics.interface'
import { ReviewModel } from '@app/review/review.model'
import { MovieModel } from '@app/movie/movie.model'
import { ViewsModel } from '@app/views/views.model'

@Injectable()
export class StatisticsService {
	constructor(
		@InjectModel(ReviewModel) private readonly reviewModel: typeof ReviewModel,
		@InjectModel(MovieModel) private readonly movieModel: typeof MovieModel,
		@InjectModel(ViewsModel) private readonly viewsModel: typeof ViewsModel
	) {}

	async getMainStatistics(): Promise<IStatisticItem[]> {
		const countReviews = await this.reviewModel.count()
		const countMovies = await this.movieModel.count()

		const views = await this.viewsModel.findAll({
			attributes: [[fn('sum', col('views')), 'views']]
		}).then(data => Number(data[0].views))

		const averageRating = await this.movieModel.findAll({
			attributes: [[fn('avg', col('rating')), 'rating']]
		}).then(data => Number(data[0].rating))
		// .then(data => Number(data[0].rating.toFixed(1)))

		return [
			{
				id: 1,
				name: 'Views',
				value: views
			},
			{
				id: 2,
				name: 'Average rating',
				value: averageRating
			},
			{
				id: 3,
				name: 'Movies',
				value: countMovies
			},
			{
				id: 4,
				name: 'Reviews',
				value: countReviews
			}
		]
	}

	async getMiddleStatistics() {
		const totalFees = await this.movieModel.findAll({
			attributes: [[fn('sum', col('fees')), 'fees']]
		}).then(data => Number(data[0].fees))

		const viewsByMonth = await this.viewsModel.findAll({
			attributes: [
				[fn('sum', col('views')), 'views'],
				[fn('date_trunc', 'month', col('createdAt')), 'month']
			],
			group: 'month'
		})

		return {
			totalFees,
			viewsByMonth
		}
	}
}
