import { Controller, Get } from '@nestjs/common'
import { Auth } from '@app/auth/decorators/auth.decorator'
import { StatisticsService } from '@app/statistics/statistics.service'

@Controller('statistics')
export class StatisticsController {
	constructor(private readonly statisticsService: StatisticsService) {}

	@Get('/main')
	@Auth()
	getMainStatistics() {
		return this.statisticsService.getMainStatistics()
	}

	@Get('/middle')
	@Auth()
	getMiddleStatistics() {
		return this.statisticsService.getMiddleStatistics()
	}
}
