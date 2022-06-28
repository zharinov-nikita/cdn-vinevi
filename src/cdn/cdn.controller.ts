import { Response, Request } from 'express'

type QueryType = {
  _id: string
  type: string
  name: string
}

type FilesType = {
  picture: File
}

class CdnController {
  constructor() {}
  async upload(req: Request, res: Response) {
    if (req?.query && req?.files) {
      if (
        req.query?._id &&
        req.query?.type &&
        req.query?.name &&
        req.files?.picture
      ) {
        const { _id, name, type }: QueryType = Object(req.query)
        const { picture }: FilesType = Object(req.files)
        return res.json({ _id, type, name, picture: picture.name })
      }
      return res.json('error')
    }
    return res.json('error')
  }
}

export default new CdnController()
