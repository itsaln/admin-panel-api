import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ViewsController } from '@app/views/views.controller'
import { ViewsService } from '@app/views/views.service'
import { ViewsModel } from '@app/views/views.model'

@Module({
	imports: [SequelizeModule.forFeature([ViewsModel])],
	controllers: [ViewsController],
	providers: [ViewsService]
})
export class ViewsModule {}
