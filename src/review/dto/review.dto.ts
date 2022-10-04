import { IsNumber, IsString } from 'class-validator'

export class ReviewDto {
	@IsString()
	description: string

	@IsNumber()
	movieId: number
}
