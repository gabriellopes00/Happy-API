//Express
    import express from 'express';
    const app = express(); 
//Express Errors
    import 'express-async-errors'
//db
    import './database/connection';
    import router from './routes';
//Path
    import path from 'path';
//Error Handling
    import errorHandler from './errors/handler';
//Cors
    import cors from 'cors';

//Express Uses
      app.use(cors());
      app.use(express.json());
      app.use(router)
      app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
      app.use(errorHandler);
      

//Port
    const port = 3333;
    app.listen(port, () => {
        console.log('Servidor rodando em http://localhost:' + port);
    })