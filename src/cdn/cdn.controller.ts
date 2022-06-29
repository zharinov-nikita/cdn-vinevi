import { Response, Request } from 'express'
import { PictureType, PropsType, QueryType } from './dto/index.dto'
import cdnService from './cdn.service'
import path from 'path'

class CdnController {
  async upload(req: Request, res: Response) {
    const array: PropsType[] = [
      { id: 1, width: 200, height: 200, format: 'jpeg' },
      { id: 2, width: 200, height: 200, format: 'webp' },
      { id: 3, width: 400, height: 400, format: 'jpeg' },
      { id: 4, width: 400, height: 400, format: 'webp' },
    ]

    const isApiKey: boolean = Boolean(req?.headers?.api_key)
    const apiKey: string = String(req?.headers?.api_key)
    const isQueryAndIsFiles: boolean = Boolean(req?.query && req?.files)

    if (isApiKey) {
      if (apiKey === process.env.API_KEY) {
        if (isQueryAndIsFiles) {
          const isQueryAndIsFilesProperty: boolean = Boolean(
            req.query?._id && req.query?.type && req.files?.picture
          )

          if (isQueryAndIsFilesProperty) {
            const { _id, type }: QueryType = Object(req.query)
            const { picture }: PictureType = Object(req.files)

            const file: any = picture
            const dir = String(`static/${type}/${_id}`)
            const extname = path.extname(picture.name)

            const dirSharp = path.resolve(String(`${dir}/source${extname}`))

            try {
              await cdnService.saveFile(file, picture.name)
              await cdnService.createDir(dir)
              await cdnService.renameFile(
                picture.name,
                `${dir}/source${extname}`
              )

              array.forEach(async (item) => {
                await cdnService.resizeFile(
                  dirSharp,
                  item.width,
                  item.height,
                  item.format,
                  dir
                )
              })
            } catch (error) {
              return res.status(500).json({
                message: {
                  level: 'error',
                  content: error,
                },
              })
            }

            const result = array.map(({ width, height, format }) => {
              return `http://localhost:3001/cdn/static/${type}/${_id}/${width}x${height}.${format}`
            })

            return res.status(200).json({
              message: {
                level: 'success',
                content: 'Files processed',
                pictures: result,
              },
            })
          }
          return res.status(500).json({
            message: {
              level: 'error',
              content: 'The file with the picture key has not been added',
            },
          })
        }
        return res.status(500).json({
          message: {
            level: 'error',
            content: 'You didnt specify the required query params (type,  _id)',
          },
        })
      }
      return res.status(500).json({
        message: {
          level: 'error',
          content: 'Incorrect api key specified',
        },
      })
    }
    return res.status(500).json({
      message: {
        level: 'error',
        content: 'Access denied',
      },
    })
  }
}

export default new CdnController()
