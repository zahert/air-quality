import { DataSource } from "typeorm"
require('dotenv').config();
export const AppDataSource = new DataSource({
    
        name: process.env.TYPEORM_DEFAULT_CONNECTION,
        charset: 'utf8mb4',
        type: 'mysql',
        legacySpatialSupport: false,
        host: process.env.TYPEORM_HOST,
        port: Number(process.env.TYPEORM_PORT),
        database: process.env.TYPEORM_DATABASE,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        synchronize: false,
        logger: 'simple-console',
        logging: ['query'],
        entities:
        process.env.TS_NODE === 'false' ? ['dist/src/entities/**/*.js'] : ['src/entities/**/*.ts'],
        migrations: process.env.TS_NODE === 'false' ? ['dist/src/migrations/**/*.js'] : ['src/migrations/**/*.ts'],
        subscribers:
        process.env.TS_NODE === 'false' ? ['dist/src/entities/**/*.js'] : ['src/entities/**/*.ts'],
      
})
 