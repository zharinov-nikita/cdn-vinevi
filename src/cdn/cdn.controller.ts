import { Response, Request } from 'express'
import { PictureType, PropsType, QueryType } from './dto/index.dto'
import cdnService from './cdn.service'
import path from 'path'

class CdnController {
  async upload(req: Request, res: Response) {
    const isQueryAndIsFiles: boolean = Boolean(req?.query && req?.files)

    if (isQueryAndIsFiles) {
      const isQueryAndIsFilesProperty: boolean = Boolean(
        req.query?._id && req.query?.type && req.files?.picture
      )

      if (isQueryAndIsFilesProperty) {
        const array: PropsType[] = [
          { id: 1, size: 200, format: 'png' },
          { id: 2, size: 400, format: 'png' },
          { id: 3, size: 200, format: 'webp' },
          { id: 4, size: 400, format: 'webp' },
        ]

        const { _id, type }: QueryType = Object(req.query)
        const { picture }: PictureType = Object(req.files)

        const file: any = picture
        const dir = String(`static/${type}/${_id}`)
        const extname = path.extname(picture.name)

        const dirSharp = path.resolve(String(`${dir}/source${extname}`))

        await cdnService.saveFile(file, picture.name)
        await cdnService.createDir(dir)
        await cdnService.renameFile(picture.name, `${dir}/source${extname}`)

        array.forEach(async (item) => {
          await cdnService.resizeFile(
            dirSharp,
            item.size,
            item.size,
            item.format,
            dir
          )
        })

        return res.status(200).json('success')
      }
      return res.status(500).json('error 2')
    }
    return res.status(500).json('error 1')
  }
}

export default new CdnController()
