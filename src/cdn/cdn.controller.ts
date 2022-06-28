import { Response, Request } from 'express'

type QueryType = {
  type: 'artist' | 'album' | 'track'
  picture: 'avatar' | 'cover'
  _id: string
}

class CdnController {
  constructor() {}
  async upload(req: { query: QueryType }, res: Response) {
    const isQuery = req.query?.type && req.query?.picture && req.query?._id
    if (isQuery) {
      return res.json(req.query)
    }
    return res.status(500).json('error')
  }
}

export default new CdnController()
