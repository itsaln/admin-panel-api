import { Body, Controller, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common'
import { MovieService } from '@app/movie/movie.service'
import { Auth } from '@app/auth/decorators/auth.decorator'
import { MovieDto } from '@app/movie/dto/movie.dto'

@Controller('movie')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@HttpCode(200)
	@Post()
	@Auth()
	create() {
		return this.movieService.create()
	}

	@Get()
	findAll(@Query('searchTerm') searchTerm?: string) {
		return this.movieService.findAll(searchTerm)
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.movieService.findOne(+id)
	}

	@HttpCode(200)
	@Put(':id')
	@Auth()
	update(@Param('id') id: string, @Body() dto: MovieDto) {
		return this.movieService.update(+id, dto)
	}

	@HttpCode(200)
	@Put(':id')
	@Auth()
	remove(@Param('id') id: string) {
		return this.movieService.remove(+id)
	}
}
