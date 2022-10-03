import { Controller } from '@nestjs/common'
import { ViewsService } from '@app/views/views.service'

@Controller('views')
export class ViewsController {
	constructor(private readonly viewsService: ViewsService) {}
}
