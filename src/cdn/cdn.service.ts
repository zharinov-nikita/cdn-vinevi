import { mkdir, rename } from 'fs/promises'
import { FormatPictureType } from './dto/index.dto'
import sharp from 'sharp'

class CdnService {
  async saveFile(file: any, name: string) {
    await file.mv(String(name))
  }

  async createDir(dir: string) {
    await mkdir(dir, { recursive: true })
  }

  async renameFile(oldDir: string, newDir: string) {
    await rename(oldDir, newDir)
  }

  async resizeFile(
    dirSharp: string,
    width: number,
    height: number,
    format: FormatPictureType,
    dir: string,
    quality: number = 50
  ) {
    sharp.cache({ files: 0 })
    await sharp(dirSharp)
      .resize(width, height, { fit: 'contain' })
      [format]({ quality })
      .toFile(String(`${dir}/${width}x${height}.${format}`))
  }
}

export default new CdnService()
