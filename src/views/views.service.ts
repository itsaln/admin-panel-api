import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ViewsModel } from '@app/views/views.model'
import { Op, fn, col } from 'sequelize'

@Injectable()
export class ViewsService {
	constructor(
		@InjectModel(ViewsModel)
		private readonly viewsModel: typeof ViewsModel
	) {}

	async updateViews(movieId: number) {
		const row = await this.viewsModel.findOne({
			where: {
				movieId,
				[Op.and]: [
					fn('month', col('createAt'), 3)
				]
			}
		})

		if (row) {
			return this.viewsModel.create({
				movieId
			})
		}

		return row.update({
			views: row.views++
		})
	}
}
