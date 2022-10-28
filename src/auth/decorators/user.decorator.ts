import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserModel } from '@app/auth/user.model'

export const CurrentUser = createParamDecorator(
	(data: keyof UserModel, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const user = request.user

		return data ? user[data] : user
	}
)
