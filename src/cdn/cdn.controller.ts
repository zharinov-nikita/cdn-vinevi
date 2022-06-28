import { Response, Request } from 'express'
import { mkdir, rmdir, rename, access } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

export type QueryType = {
  _id: string
  type: 'aritst' | 'album' | 'track'
}

export type FilesType = {
  picture: File
}

export type ArrayType = {
  id: number
  size: number
  format: 'jpeg' | 'webp'
  option: any
}

class CdnController {
  async upload(req: Request, res: Response) {
    const isQueryAndIsFiles: boolean = Boolean(req?.query && req?.files)

    if (isQueryAndIsFiles) {
      const isQueryAndIsFilesProperty: boolean = Boolean(
        req.query?._id && req.query?.type && req.files?.picture
      )

      if (isQueryAndIsFilesProperty) {
        const array: ArrayType[] = [
          { id: 1, size: 200, format: 'jpeg', option: { quality: 50 } },
          { id: 2, size: 400, format: 'jpeg', option: { quality: 50 } },
          { id: 3, size: 200, format: 'webp', option: { quality: 50 } },
          { id: 4, size: 400, format: 'webp', option: { quality: 50 } },
        ]

        const { _id, type }: QueryType = Object(req.query)
        const { picture }: FilesType = Object(req.files)

        const file: any = picture
        const dir = String(`static/${type}/${_id}`)
        const extname = path.extname(picture.name)

        await file.mv(String(picture.name))
        await mkdir(dir, { recursive: true })
        await rename(String(picture.name), String(`${dir}/source${extname}`))

        array.forEach(async ({ id, size, format, option }) => {
          await sharp(String(`${dir}/source${extname}`))
            .resize(size, size, { fit: 'contain' })
            [format](option)
            .toFile(String(`${dir}/${size}x${size}.${format}`))
        })

        return res.status(200).json('success')
      }
      return res.status(500).json('error 2')
    }
    return res.status(500).json('error 1')
  }
}

export default new CdnController()
