import { Module } from '@nestjs/common'
import { MediaController } from '@app/media/media.controller'
import { MediaService } from '@app/media/media.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads'
		})
	],
	controllers: [MediaController],
	providers: [MediaService]
})
export class MediaModule {}
