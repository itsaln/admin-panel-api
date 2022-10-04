import { IsNumber, IsString } from 'class-validator'

export class MovieDto {
	@IsString()
	name: string

	@IsNumber()
	fees: number

	@IsString()
	poster: string
}
