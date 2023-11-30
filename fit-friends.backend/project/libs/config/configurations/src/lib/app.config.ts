import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import * as process from 'process';
import {Logger} from '@nestjs/common';

const DEFAULT_PORT = 3001;

enum environmentValue {
  'development' = 'development',
  'production' = 'production',
  'stage' = 'stage'
}

export interface ApplicationConfig {
  environment: string;
  port: number;
}

export default registerAs('application', (): ApplicationConfig => {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV || environmentValue.development,
    port: parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10),
  };
  const logger = new Logger('AppConfig');
  logger.log(`application port = ${config.port}`);
  const validationSchema = Joi.object<ApplicationConfig>({
    environment: Joi.string().valid(...Object.values(environmentValue)).required(),
    port: Joi.number().port().default(DEFAULT_PORT),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Application Config]: Environments validation failed. Please check .env file.
      Error message: Application.${error.message}`,
    );
  }
  return config;
});
