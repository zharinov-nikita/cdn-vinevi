import { Response, Request } from 'express'

type QueryType = {
  _id: string
  type: 'aritst' | 'album' | 'track'
}

type FilesType = {
  picture: File
}

class CdnController {
  constructor() {}
  async upload(req: Request, res: Response) {
    const isQueryAndIsFiles = req?.query && req?.files

    if (isQueryAndIsFiles) {
      const isQueryAndIsFilesProperty =
        req.query?._id && req.query?.type && req.files?.picture

      if (isQueryAndIsFilesProperty) {
        const { _id, type }: QueryType = Object(req.query)
        const { picture }: FilesType = Object(req.files)
        return res.json({ _id, type, picture: picture.name })
      }
      return res.json('error')
    }
    return res.json('error')
  }
}

export default new CdnController()
