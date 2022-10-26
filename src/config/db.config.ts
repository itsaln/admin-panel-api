import { ConfigService } from '@nestjs/config'
import { SequelizeModuleOptions } from '@nestjs/sequelize'

export const getSequelizeConfig = async (
	configService: ConfigService
): Promise<SequelizeModuleOptions> => {
	return {
		dialect: 'postgres',
		host: configService.get('HOST'),
		port: configService.get('PORT'),
		database: configService.get('DATABASE'),
		username: configService.get('USERNAME'),
		password: configService.get('PASSWORD'),
		autoLoadModels: true,
		synchronize: true,
		logging: false
	}
}
