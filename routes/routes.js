import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => res.render('index', {title: 'Inicio'}))

router.get('/reservas', (req, res) => res.render('reservas'))

export default router