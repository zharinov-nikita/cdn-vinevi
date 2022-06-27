import { Response, Request } from 'express'

class CdnController {
  constructor() {}
  create(req: Request, res: Response): any {
    return res.json(req.files)
  }
}

export default new CdnController()
