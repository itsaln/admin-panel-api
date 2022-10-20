import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ReviewService } from '@app/review/review.service'
import { Auth } from '@app/auth/decorators/auth.decorator'
import { CurrentUser } from '@app/auth/decorators/user.decorator'
import { ReviewDto } from '@app/review/dto/review.dto'

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	create(@CurrentUser('id') id: string, @Body() dto: ReviewDto) {
		return this.reviewService.create(+id, dto)
	}

	@Get()
	@Auth()
	findAll() {
		return this.reviewService.findAll()
	}

	@Get(':id')
	@Auth()
	findOne(@Param('id') id: string) {
		return this.reviewService.findOne(+id)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	remove(@Param('id') id: string) {
		return this.reviewService.remove(+id)
	}
}
