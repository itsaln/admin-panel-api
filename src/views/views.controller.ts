import { Controller, HttpCode, Param, Patch, UsePipes, ValidationPipe } from '@nestjs/common'
import { ViewsService } from '@app/views/views.service'

@Controller('views')
export class ViewsController {
	constructor(private readonly viewsService: ViewsService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch('update/:movieId')
	update(@Param('movieId') movieId: string) {
		return this.viewsService.update(+movieId)
	}
}
