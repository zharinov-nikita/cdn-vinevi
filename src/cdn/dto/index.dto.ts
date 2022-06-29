export type FormatPictureType = 'jpeg' | 'webp' | 'png' | 'gif'

export type QueryType = {
  _id: string
  type: 'aritst' | 'album' | 'track'
}

export type PictureType = {
  picture: File
}

export type PropsType = {
  id: number
  width: number
  height: number
  format: 'jpeg' | 'webp' | 'png' | 'gif'
}
