import { ConfigService } from '@nestjs/config'
import { SequelizeModuleOptions } from '@nestjs/sequelize'

export const getSequelizeConfig = async (
	configService: ConfigService
): Promise<SequelizeModuleOptions> => {
	return {
		dialect: 'postgres',
		host: configService.get('DB_HOST'),
		port: configService.get('DB_PORT'),
		database: configService.get('DATABASE_URL'),
		username: configService.get('DB_USERNAME'),
		password: configService.get('DB_PASSWORD'),
		autoLoadModels: true,
		synchronize: true,
		logging: false
	}
}
