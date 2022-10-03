import { Module } from '@nestjs/common'
import { AppController } from '@app/app.controller'
import { AppService } from '@app/app.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getSequelizeConfig } from '@app/config/db.config'
import { AuthModule } from '@app/auth/auth.module'
import { MovieModule } from '@app/movie/movie.module'
import { ReviewModule } from '@app/review/review.module'
import { ViewsModule } from '@app/views/views.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getSequelizeConfig
		}),
		AuthModule,
		MovieModule,
		ReviewModule,
		ViewsModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
