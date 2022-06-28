import { Router } from 'express'
import cdnController from './cdn.controller'

const router = Router()
router.post('/upload', cdnController.upload)

export default router
