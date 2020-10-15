//Express
    import {Router} from 'express'
    const router = Router();

//images uploads imports
    import multer from 'multer';
    import uploadConfig from './config/upload'
    const upload = multer(uploadConfig);

//db Controller import
    import OrphanagesController from './controllers/OrphanagesController'

//Routes
    router.post('/orphanages', upload.array('images'), OrphanagesController.create)
    router.get('/orphanages', OrphanagesController.index)
    router.get('/orphanages/:id', OrphanagesController.show)

export default router;