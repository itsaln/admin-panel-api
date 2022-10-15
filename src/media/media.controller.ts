import { Controller, HttpCode, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from '@app/auth/decorators/auth.decorator'
import { MediaService } from '@app/media/media.service'

@Controller('media')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@HttpCode(200)
	@Post()
	@Auth()
	@UseInterceptors(FileInterceptor('media'))
	uploadMediaFile(
		@UploadedFile() mediaFile: Express.Multer.File,
		@Query('folder') folder?: string
	) {
		return this.mediaService.saveMedia(mediaFile, folder)
	}
}
