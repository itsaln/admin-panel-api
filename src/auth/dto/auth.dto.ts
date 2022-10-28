import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsString()
	name?: string

	@IsEmail()
	email: string

	@MinLength(6, {
		message: 'Password cannot be less than 6 characters!'
	})
	@IsString()
	password: string

	@IsString()
	avatarPath?: string
}
