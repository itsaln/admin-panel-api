import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { IMediaResponse } from '@app/media/media.interface'

@Injectable()
export class MediaService {
	async saveMedia(
		mediaFile: Express.Multer.File[],
		folder = 'default'
	): Promise<IMediaResponse[]> {
		const uploadFolder = `${path}/uploads/${folder}`
		await ensureDir(uploadFolder)

		// await writeFile(
		// 	`${uploadFolder}/${mediaFile.originalname}`,
		// 	mediaFile.buffer
		// )
		//
		// return {
		// 	url: `/uploads/${folder}/${mediaFile.originalname}`,
		// 	name: mediaFile.originalname
		// }

		const res: IMediaResponse[] = await Promise.all(
			mediaFile.map(async file => {
				await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
				return {
					url: `/uploads/${folder}/${file.originalname}`,
					name: file.originalname
				}
			})
		)

		return res
	}
}
