import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { JwtService } from '@nestjs/jwt'
import { compare, genSalt, hash } from 'bcryptjs'
import { faker } from '@faker-js/faker'
import { UserModel } from '@app/auth/user.model'
import { AuthDto } from '@app/auth/dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel)
		private readonly userModel: typeof UserModel,
		private readonly jwtService: JwtService
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)

		return {
			user: this.returnUserFields(user),
			accessToken: await this.issueAccessToken(user.id)
		}
	}

	async register(dto: AuthDto) {
		const oldUser = await this.userModel.findOne({
			where: { email: dto.email }
		})
		if (oldUser) throw new BadRequestException('User with this email is already in the system')

		const salt = await genSalt(10)

		const user = await this.userModel.create({
			name: faker.name.firstName(),
			email: dto.email,
			password: await hash(dto.password, salt),
			avatarPath: faker.image.avatar()
		})

		return {
			user: this.returnUserFields(user),
			accessToken: await this.issueAccessToken(user.id)
		}
	}

	async validateUser(dto: AuthDto) {
		const user = await this.userModel.findOne({
			where: { email: dto.email },
			attributes: ['id', 'name', 'email', 'avatarPath', 'password']
		})
		if (!user) throw new UnauthorizedException('User not found')

		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword) throw new UnauthorizedException('Invalid password')

		return user
	}

	async issueAccessToken(userId: string) {
		const data = { id: userId }

		return await this.jwtService.signAsync(data, {
			expiresIn: '31d'
		})
	}

	returnUserFields(user: UserModel) {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			avatarPath: user.avatarPath
		}
	}
}
