import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { MovieController } from '@app/movie/movie.controller'
import { MovieService } from '@app/movie/movie.service'
import { MovieModel } from '@app/movie/movie.model'

@Module({
	imports: [SequelizeModule.forFeature([MovieModel])],
	controllers: [MovieController],
	providers: [MovieService]
})
export class MovieModule {}
