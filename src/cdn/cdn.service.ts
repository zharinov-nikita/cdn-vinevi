import * as fs from 'node:fs/promises'
import path from 'path'

class CdnService {
  mkdir() {
    try {
      fs.mkdir('static')
    } catch (e) {
      console.log(e)
    }
  }
}

export default new CdnService()
