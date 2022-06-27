import { Router } from 'express'
import cdnController from './cdn.controller'

const router = Router()
router.post('/create', cdnController.create)

export default router
