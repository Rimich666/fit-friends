import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import * as process from 'process';

const DefaultMongoDbOptions = {
  HOST: '127.0.0.1',
  PORT: '27017',
  NAME: 'base',
  USER: 'admin',
  PASSWORD: 'password',
  AUTH_BASE: 'admin',
};

export interface MongoConfig {
  host: string;
  name: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

export default registerAs('mongo', (): MongoConfig => {
  const config: MongoConfig = {
    host: process.env['MONGO_DB_HOST'] || DefaultMongoDbOptions.HOST,
    port: parseInt(process.env['MONGO_DB_PORT'] || DefaultMongoDbOptions.PORT.toString(), 10),
    name: process.env['MONGO_DB_NAME'] || DefaultMongoDbOptions.NAME,
    user: process.env['MONGO_DB_USER'] || DefaultMongoDbOptions.USER,
    password: process.env['MONGO_DB_PASSWORD'] || DefaultMongoDbOptions.PASSWORD,
    authBase: process.env['MONGO_DB_AUTH_BASE'] || DefaultMongoDbOptions.AUTH_BASE,
  };

  const validationSchema = Joi.object<MongoConfig>({
    host: Joi.string().valid().hostname(),
    port: Joi.number().port(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Mongo Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
    );
  }

  return config;
});

