//Imports
    //Express
        import {Request, Response} from 'express';
    //ORM and Orphanages model
        import {getRepository} from 'typeorm';
        import Orphanages from '../models/orphanages';
    //View
        import orphanagesView from '../views/orphanagesView';
    // Yup validator
        import * as Yup from 'yup';


export default {
    //Orphanages list
    async index(req: Request, res: Response){
        const orphanagesRepository = getRepository(Orphanages);
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return res.json(orphanagesView.renderMany(orphanages));
    },

    //Single Orphanage list
    async show(req: Request, res: Response){
        const {id} = req.params;
        const orphanagesRepository = getRepository(Orphanages);
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return res.json(orphanagesView.render(orphanage));
    },

    //Function Insert Orphanages datas
    async create(req:Request, res:Response){

        //receiving data from the front end
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
    
        } = req.body; 
    
        const orphanagesRepository = getRepository(Orphanages);

        //Receiving images
        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(image =>{
            return{path: image.filename};
        })

        //Orphanages datas
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends == 'true', //Converting string 'true' to boolean true.
            images //The images are created together the orphanages
        };

        //Yup Validation 
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required().max(300),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
            }))
        });
        //Validation function
        await schema.validate(data, {
            abortEarly: false
        });
        
        //Insert after validation
        const orphanages = orphanagesRepository.create(data);    
        await orphanagesRepository.save(orphanages);
        
        //return
        return res.status(201).json({orphanages})
    }
}