import fs from 'fs'
import path from 'path'

class CdnService {
  save(type: string, _id: string) {
    const dirName = path.resolve(`static/${type}/${_id}`)
    fs.mkdir(dirName, { recursive: true }, (err) => {
      if (err) throw new Error('error')
    })
  }
}

export default new CdnService()
