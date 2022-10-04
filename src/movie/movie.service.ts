import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { MovieModel } from '@app/movie/movie.model'
import { WhereOptions, Op } from 'sequelize'
import { MovieDto } from '@app/movie/dto/movie.dto'

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel)
		private readonly movieModel: typeof MovieModel
	) {}

	async getAll(searchTerm?: string) {
		let options: WhereOptions<MovieModel> = {}

		if (searchTerm) {
			options = {
				[Op.or]: [{ name: { like: `%${searchTerm}%` } }]
			}

			return await this.movieModel.findAll({
				where: {
					...options
				},
				order: [['createdAt', 'DESC']],
				include: [
					{ all: true }
				]
			})
		}
	}

	async getById(id: number) {
		const movie = await this.movieModel.findOne({
			where: { id },
			include: [
				{ all: true }
			]
		})
		if (!movie) throw new NotFoundException('Video not found')

		return movie
	}

	async create() {
		const movie = await this.movieModel.create()
		return movie.id
	}

	async update(id: number, dto: MovieDto) {
		const movie = await this.getById(id)

		return movie.update({
			...movie,
			...dto
		})
	}

	async delete(id: number) {
		return this.movieModel.destroy({ where: { id } })
	}

	async updateCountViews(id: number) {
		// const movie = await this.byId(id)
		// movie.views++
		// return this.movieModel.save(movie)
	}
}
