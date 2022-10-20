import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { WhereOptions, Op } from 'sequelize'
import { MovieModel } from '@app/movie/movie.model'
import { MovieDto } from '@app/movie/dto/movie.dto'
import { ReviewModel } from '@app/review/review.model'
import { UserModel } from '@app/auth/user.model'

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel) private readonly movieModel: typeof MovieModel
	) {
	}

	async create() {
		const movie = await this.movieModel.create()
		return movie.id
	}

	async findAll(searchTerm?: string) {
		let options: WhereOptions<MovieModel> = {}

		if (searchTerm) {
			options = {
				name: { [Op.like]: `%${searchTerm}%` }
			}
		}

		// TODO: Get movie views

		return this.movieModel.findAll({
			where: {
				...options
			},
			order: [['createdAt', 'DESC']],
			include: [
				{ all: true }
			]
		})

	}

	async findOne(id: number) {
		const movie = await this.movieModel.findOne({
			where: { id },
			include: [
				{
					model: ReviewModel,
					include: [UserModel]
				}
			]
		})
		if (!movie) throw new NotFoundException('Movie not found')

		return movie
	}

	async update(id: number, dto: MovieDto) {
		const movie = await this.findOne(id)

		return movie.update({
			...movie,
			...dto
		})
	}

	async remove(id: number) {
		return this.movieModel.destroy({ where: { id } })
	}
}
