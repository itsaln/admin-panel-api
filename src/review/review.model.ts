import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { MovieModel } from '@app/movie/movie.model'
import { UserModel } from '@app/auth/user.model'

@Table({ tableName: 'Review', deletedAt: false, version: false })
export class ReviewModel extends Model<ReviewModel> {
	@Column({ defaultValue: '' })
	description: string

	@ForeignKey(() => UserModel)
	@Column
	userId: number

	@BelongsTo(() => UserModel)
	user: UserModel

	@ForeignKey(() => MovieModel)
	@Column
	movieId: number

	@BelongsTo(() => MovieModel)
	movie: MovieModel
}
