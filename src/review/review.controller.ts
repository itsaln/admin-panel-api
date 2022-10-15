import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common'
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
}
