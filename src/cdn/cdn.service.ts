import fs from 'fs'
import path from 'path'

class CdnService {
  create(type: string, _id: string) {
    const dirName = path.resolve(`static/${type}/${_id}`)
    fs.mkdir(dirName, { recursive: true }, (err) => {
      if (err) throw new Error('error')
    })
  }

  defineExtname(dir: string) {
    const dirFile = path.resolve(dir)
    const extname = path.extname(dirFile)
    return extname
  }

  save(file: any, oldDir: string, newDir: string) {
    file.mv(file.name, () => {
      fs.rename(oldDir, newDir, (err) => {
        if (err) throw new Error('error')
      })
    })
  }
}

export default new CdnService()
