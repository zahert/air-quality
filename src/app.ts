// this shim is required
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import express from 'express';
import * as cron from 'node-cron';
import 'reflect-metadata';
import { getMetadataArgsStorage, RoutingControllersOptions, useExpressServer } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';
import { AppDataSource } from '../data-source';
import { PollutionController } from './controllers/PollutionController';
import { PollutionService } from './services/PollutionService';
const { defaultMetadataStorage } = require('class-transformer/cjs/storage')
require('dotenv').config();

const app = express();

AppDataSource.initialize()
  .then(() => {
    
    const routingControllersOptions: RoutingControllersOptions = {
      defaultErrorHandler: false,
      controllers: [PollutionController], // we specify controllers we want to use
      middlewares: process.env.TS_NODE === 'false' ? [__dirname + '/middlewares/**/*.js'] : [__dirname + '/middlewares/**/*.ts'],
    }
    // creates express app, registers all controller routes and returns you express app instance
    useExpressServer(app,routingControllersOptions);

    cron.schedule('* * * * *', () => {
      const pollutionService = new PollutionService();
      pollutionService.schedulerLogic();
    });
 
    const storage = getMetadataArgsStorage();
    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
    });
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
      components: {
        schemas: schemas,
        securitySchemes: {
          basicAuth: {
            scheme: 'basic',
            type: 'http',
          },
        },
      },
      info: {
        description: 'Pollution API',
        title: 'Pollution API',
        version: '1.0.0',
      },
    });

    app.use(
      '/api-docs/swagger',
      swaggerUiExpress.serve,
      swaggerUiExpress.setup(spec, { explorer: true })
    );
    // run express application on port 3000
    app.listen(3000);
  })
  .catch(async (err) => {
   // console.error('server#createConnection', err.stack);

    process.exit(1);
  });

export default app;
