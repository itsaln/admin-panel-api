import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { StatisticsService } from '@app/statistics/statistics.service'
import { StatisticsController } from '@app/statistics/statistics.controller'
import { ReviewModel } from '@app/review/review.model'
import { MovieModel } from '@app/movie/movie.model'
import { ViewsModel } from '@app/views/views.model'

@Module({
	imports: [SequelizeModule.forFeature([ReviewModel, MovieModel, ViewsModel])],
	controllers: [StatisticsController],
	providers: [StatisticsService]
})
export class StatisticsModule {}
