import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJWTConfig } from '@app/config/jwt.config'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from '@app/auth/strategies/auth.strategy'
import { AuthController } from '@app/auth/auth.controller'
import { AuthService } from '@app/auth/auth.service'
import { UserModel } from '@app/auth/user.model'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig
		}),
		SequelizeModule.forFeature([UserModel])
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
