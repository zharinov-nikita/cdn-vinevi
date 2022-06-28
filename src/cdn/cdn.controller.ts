import { Response, Request } from 'express'
import cdnService from './cdn.service'

export type QueryType = {
  _id: string
  type: 'aritst' | 'album' | 'track'
}

export type FilesType = {
  picture: File
}

class CdnController {
  async upload(req: Request, res: Response) {
    const isQueryAndIsFiles: boolean = Boolean(req?.query && req?.files)

    if (isQueryAndIsFiles) {
      const isQueryAndIsFilesProperty: boolean = Boolean(
        req.query?._id && req.query?.type && req.files?.picture
      )

      if (isQueryAndIsFilesProperty) {
        const { _id, type }: QueryType = Object(req.query)
        const { picture }: FilesType = Object(req.files)

        const oldDir = String(picture.name)
        const format = String(cdnService.defineExtname(oldDir))
        const newDir = String(`static/${type}/${_id}/picture${format}`)

        cdnService.create(type, _id)
        cdnService.save(picture, oldDir, newDir)

        return res.status(200).json('success')
      }
      return res.status(500).json('error')
    }
    return res.status(500).json('error')
  }
}

export default new CdnController()
