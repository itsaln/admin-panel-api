import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { MediaController } from '@app/media/media.controller'
import { MediaService } from '@app/media/media.service'

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
