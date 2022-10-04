import { Body, Controller, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common'
import { MovieService } from '@app/movie/movie.service'
import { Auth } from '@app/auth/decorators/auth.decorator'
import { MovieDto } from '@app/movie/dto/movie.dto'

@Controller('movie')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.movieService.getAll(searchTerm)
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.movieService.getById(+id)
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async create() {
		return this.movieService.create()
	}

	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(@Param('id') id: string, @Body() dto: MovieDto) {
		return this.movieService.update(+id, dto)
	}

	@HttpCode(200)
	@Put(':id')
	@Auth()
	async delete(@Param('id') id: string) {
		return this.movieService.delete(+id)
	}
}
